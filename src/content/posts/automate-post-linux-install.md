# how to automate post linux install?

after fresh debian install:

1. login as root
2. use `apt install sudo` to install sudo.
3. `useradd -aG sudo tims` to add user to sudo group.

4. `su tims` to switch user.
5. `sudo apt update && sudo apt upgrade` to update system.
6. `sudo apt install git ansible flatpak` to install git.
7. `git clone https://github.com/0xtimsb/dotfiles.git` to clone dotfiles.
8. `cd dotfiles` to change directory.

9. `ansible-playbook ./install.yml -K` to run all post-installation tasks.
