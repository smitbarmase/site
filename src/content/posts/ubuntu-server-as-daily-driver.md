---
title: ubuntu server as daily driver
date: 2024-08-29
---

recently, i bought a laptop that everyone dreams of having—a used t480. i decided to put ubuntu server on it because a lot of the open source projects i'm working on have setup guides for ubuntu. i don't want weird bugs just because i'm using something else.

below are my notes on how i made it usable for my daily needs, just in case i need to refer back if my setup breaks.

i don't care about how my os looks. i aim for the ugly default—less is more. so, i haven't used any themes, fancy bars, or applets.

## shell

the first thing i did was switch to fish for the autocompletions.
```
sudo apt update 
audo apt install fish
```

# window manager

as a long-time i3wm user, i'm addicted to it. the reason i'm using sway is explained later.
```
sudo apt install sway swaylock swayidle
```

to start sway on startup:
```
if status is-login
    if test -z "$WAYLAND_DISPLAY" -a "$XDG_VTNR" = 1
        exec sway
    end
end
```

i keep the default config for most things like lock, idle, and keybindings. the few tweaks i made are below.

## timezone

to my surprise, the timezone wasn't correct. maybe i messed it up during installation.
```
sudo timedatectl set-timezone <timezone>
```

## text editor

i mostly use zed as my primary editor, but for notes or config edits, neovim is my go-to.
```
sudo apt install neovim
```

add this alias to your `config.fish`:
```
alias vim="nvim"
```

i have an nvim config with a few settings, but the most important one is syncing the clipboard between the system and neovim. to set it up, add this line to your `~/.config/nvim/init.lua`:
```
vim.opt.clipboard = "unnamedplus"
```

and you will have to install to make it work.

```

you'll also need to install this package:
```

you can install zed from [here](https://zed.dev/docs/linux)

## browser

ubuntu comes with snap, and it's pretty slow. i'm using firefox from mozilla ppa instead.

first, remove snap.
```
sudo apt purge snapd
sudo apt autoremove
```
to block snap from auto-installing, create `/etc/apt/preferences.d/no-snap.pref`:
```
Package: snapd
Pin: release a=*
Pin-Priority: -10
```

to block ubuntu's version of firefox, create `/etc/apt/preferences.d/firefox-no-snap.pref`:
```
Package: firefox*
Pin: release o=Ubuntu*
Pin-Priority: -1
```

add mozilla ppa and install firefox:
```
sudo add-apt-repository ppa:mozillateam/ppa
sudo apt update
sudo apt install firefox
```

for better font support:
```
sudo apt install fonts-noto-core
```

## terminal

the default foot terminal works fine. i just changed the font size in `foot.ini`.
```
font=monospace:size=12
```

## ssh

if you're setting up github ssh using the official docs, they only explain bash and zsh. here's how to start ssh-agent in fish:
```
eval (ssh-agent -c)
```

## bluetooth

i was surprised i didn't need to do anything special for auto-connect. i have three devices: one keyboard, one mouse, and earbuds, and they all work fine. for a gui, use `blueman-manager`.
```
sudo apt install blueman
```

## multiple displays

when i was using i3wm, i had issues like screen tearing (fixable via picom) and handling display dpis. sway fixes these problems and is straightforward.
```
set $out-main eDP-1
set $out-ext DP-1

output $out-main pos 0 0 res 1920x1080
output $out-ext pos 0 -1080 res 1920x1080
```

i use up to three workspaces per screen. binding external workspaces to 8, 9, and 0 makes navigation easier.
```
bindsym $mod+1 workspace number 1
bindsym $mod+2 workspace number 2
bindsym $mod+3 workspace number 3
bindsym $mod+8 workspace a
bindsym $mod+9 workspace b
bindsym $mod+0 workspace c

bindsym $mod+Shift+1 move container to workspace number 1
bindsym $mod+Shift+2 move container to workspace number 2
bindsym $mod+Shift+3 move container to workspace number 3
bindsym $mod+Shift+8 move container to workspace a
bindsym $mod+Shift+9 move container to workspace b
bindsym $mod+Shift+0 move container to workspace c

workspace 1 output $out-main
workspace 2 output $out-main
workspace 3 output $out-main

workspace a output $out-ext
workspace b output $out-ext
workspace c output $out-ext
```

## touchpad

i usually like the defaults, but input settings are all messed up. here's what i set:
```
input "type:touchpad" {
    tap enabled
    natural_scroll enabled
    dwt enabled
    pointer_accel 0.5
    middle_emulation disabled
}
```

same scroll direction for the mouse:
```
input "type:pointer" {
    natural_scroll enabled
    pointer_accel 0.8
}
```

faster backspace deletions:
```
input "type:keyboard" {
    repeat_delay 200
    repeat_rate 30
}
```

## keyboard keys

keys like sound and brightness don't work out of the box; you need to bind them to specific commands.
```
bindsym XF86MonBrightnessUp exec brightnessctl set +5%
bindsym XF86MonBrightnessDown exec brightnessctl set 5%-

bindsym XF86AudioRaiseVolume exec ~/.config/sway/increase_volume.sh
bindsym XF86AudioLowerVolume exec pactl set-sink-volume @DEFAULT_SINK@ -5%
bindsym XF86AudioMute exec pactl set-sink-mute @DEFAULT_SINK@ toggle

bindsym XF86AudioMicMute exec pactl set-source-mute @DEFAULT_SOURCE@ toggle
```

i have a custom script to keep volume under 100%.
```sh
#!/bin/bash

pactl set-sink-volume @DEFAULT_SINK@ +5%

current_volume=$(pactl get-sink-volume @DEFAULT_SINK@ | awk '{print $5}' | sed 's/%//')

if [ "$current_volume" -gt "100" ]; then
    pactl set-sink-volume @DEFAULT_SINK@ 100%
fi
```

## status bar

there are better bars than the default sway one, but i like to keep it simple.
```
bar {
    position top
    status_command ~/.config/sway/status.sh
    colors {
        statusline #ffffff
        background #323232
        inactive_workspace #32323200 #32323200 #5c5c5c
    }
}
```

this script shows battery, volume, brightness, and date info:
```
#!/bin/bash

update_status() {
    battery_0=$(cat /sys/class/power_supply/BAT0/capacity)
    battery_1=$(cat /sys/class/power_supply/BAT1/capacity)
    
    is_muted=$(pactl get-sink-mute @DEFAULT_SINK@ | awk '{print $2}')
    if [ "$is_muted" = "yes" ]; then
        volume="mute"
    else
        volume=$(pactl get-sink-volume @DEFAULT_SINK@ | grep -Po '[0-9]{1,3}(?=%)' | head -1)
        volume="${volume}%"
    fi
    
    brightness=$(brightnessctl -m -d intel_backlight | cut -d',' -f4 | tr -d %)
    date_time=$(date +'%Y-%m-%d %I:%M:%S %p')
    echo "bat main: $battery_0% | bat alt: $battery_1% | vol: $volume | bright: $brightness% | date: $date_time "
}

while true; do
    update_status
    sleep 1
done
```

this script only updates every second, so changes might lag. to fix that, we listen for events:

- `pactl subscribe` listens for volume changes.
- `inotifywait` watches battery and brightness files for updates.

```
sudo apt install inotifywait
```
```
cleanup() {
    kill $(jobs -p)
    exit
}

trap cleanup EXIT

pactl subscribe | grep --line-buffered "sink" | while read -r; do
    update_status
done &

(
    while true; do
        inotifywait -q -e modify /sys/class/power_supply/BAT0/capacity /sys/class/power_supply/BAT1/capacity /sys/class/backlight/intel_backlight/brightness > /dev/null 2>&1
        update_status
    done
) &
```

## lauching apps

i try to bind apps to keyboard shortcuts; otherwise, i use the terminal. there are app launchers you can use.

## music

there are terminal alternatives to spotify, but i use the default app.
get it [here](https://www.spotify.com/de-en/download/linux/).

since spotify isn't optimized for wayland, pass the flag manually:
```
bindsym $mod+m exec spotify --ozone-platform=wayland
```


