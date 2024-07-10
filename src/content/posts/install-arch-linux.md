# install arch linux

## pre-installation

1. connect to wifi with `iwctl`

2. `timedatectl` to set time.

## partitioning

3. use `fdisk -l` to list disks. use `fdisk /dev/sda` (which is your disk name) to partition it.

4. use `g` to set it up as GPT.

5. use `n` to create new partition. first sector size is `+1G`.

6. use `t` to set it's type as `uefi`.

7. second sector again of `+4G` and make it `swap` type.

8. last sector can take all space and use type as `linux` file system.

9. to save partition, use `w`. and you can list it via `fdisk -l` again.

## formatting

10. use `mkfs.ext4 /dev/sda3` to format linux file system.

11. to make swap, `mkswap /dev/sda2`.

12. for boot partition, use `mkfs.fat -F 32 /dev/sda1`.

## mounting

13. for mouting.

- `mount /dev/sda3 /mnt`
- `mount --mkdir /dev/sda1 /mnt/boot`
- `swapon /dev/sda2`

## essential packages

15. now for packages: `pacstrap -K /mnt base base-devel linux linux-firmware intel-ucode vim neovim e2fsprogs ntfs-3g networkmanager

## configuration

16. now for ftsab file gen: `genfstab -U /mnt >> /mnt/etc/fstab`

## chroot

17. then `arch-chroot /mnt`

## time

18. `ln -sf /usr/share/zoneinfo/Asia/Kolkata /etc/localtime`

19. `hwclock --systohc`

## locale

20. then edit `/etc/locale.gen` using vim and uncomment en_US locales.

21. to gen `locale-gen`.

22. add `LANG=en_US.UTF-8` to `/etc/locale.conf`

## network config

23. add hostname by editing `/etc/hostname` and add anything like `arch`.

24. edit `/etc/hosts` and add:

- `127.0.0.1    localhost`
- `::1          localhost`
- `127.0.1.1    arch` this is your hostname which you added above

## initramfs

25. use `mkinitcpio -P` to build.

## root password

26. now to setup password for root user. type `passwd`.

## boot loader

27. now its time for boot loader. use `pacman -S grub efibootmgr`.

28. `grub-install --efi-directory=/boot --bootloader-id=GRUB`

29. `grub-mkconfig -o /boot/grub/grub.cfg`

## reboot

30. now you can `exit` and unmount using `umount -R /mnt`

31. `poweroff`

## user groups

1. create new user `useradd -m -g users -G wheel,storage,power,audio tims`

2. `passwd tims` to set password.

3. `EDITOR=vim visudo` uncomment wheel line to give permission to wheel user.

4. `su tims` to switch user.

## connect to internet

5. `systemctl start NetworkManager`

6. `nmcli device wifi connect SSID password PASSWORD`

## yay installation

1. make sure you are at home dir by `cd ~`

2. `sudo pacman -S git`

3. `git clone https://aur.archlinux.org/yay.git`

4. `cd yay`

5. `makepkg -si`

## bluetooth

sudo pacman -S bluez bluez-utils

## sound

sudo pacman -S pulseaudio pulseaudio-alsa pulseaudio-bluetoth

## ssh

sudo pacman -S openssh

note: use `eval (ssh-agent -c)` on fish shell while setting up ssh for git.

## auto start services

sudo systemctl enable sshd
sudo systemctl enable NetworkManager
sudo systemctl enable bluetooth
sudo systemctl enable fstrim.timer

## x server

sudo pacman -S xorg-server xorg-xinit xorg-apps xclip

## apps

sudo pacman -S kitty dmenu firefox vlc picom gnome-keyring polybar


## window manager

sudo pacman -S i3

- add `exec i3` to `~/.xinitrc`. this will start i3 when you run `startx`.

- use i3 config from my github dotfiles

## xorg config

use `/etc/X11/xorg.conf.d/30-touchpad.conf` to enable single tap click and natural scrolling.

```
Section "InputClass"
    Identifier "touchpad"
    Driver "libinput"
    MatchIsTouchpad "on"
    Option "Tapping" "on"
    Option "TappingButtonMap" "lrm"
    Option "NaturalScrolling" "true"
EndSection
```

## setup fish

- `sudo pacman -S fish`

- `chsh -l` to list available shells.

- `chsh -s /path/to/fish` to set fish as default shell.

- delete bash related files. `rm ~/.bashrc ~/.bash_profile ~/.bash_logout ~/.bash_history`

- put `alias vim="nvim"` in `~/.config/fish/config.fish`

## node

sudo pacman -S fisher

fisher install jorgebucaran/nvm.fish

nvm install lts


## proprietary apps

yay -S visual-studio-code-bin spotify slack-desktop


# DUMP START

1. sudo pacman -S iw wpa_supplicant picom noto-fonts
2. yay -S nerd-fonts-complete
3. sudo pacman -S fzf ripgrep fd

alsa-utils alsa-plugins pavucontrol

<!-- sudo systemctl enable dhcpcd -->

# DUMP END
