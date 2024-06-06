At work, I constantly need to switch brances, pull latest changes, stash changes I'm currently working on.
All of this couple times a day.

At first, I used to VS Code, my primary editor GUI do all of that. Well, we all know there is better way. Terminal!

But, writing commands even with auto completion is pain. What is the better option?

I stubbled upon easy looking but powerful, VS Code keybindings!

Now I use following to do all of the above with just few key strokes.

Imagine I'm working on a feature branch and I need to switch to dev branch, make some quick fixes, push it and come back to my feature branch.

This is how I do it now.

1. Command + G + S - To stash all my changes
2. Command + G + F - To fetch latest changes
3. Command + G + C - To checkout to the branch I want to work on
4. Command + G + Shift + P - To pull latest changes of the branch
5. Command + G + Space - To commit my changes, after I'm done with my staged changes
6. Command + G + P - To push my changes to the branch
7. Command + G + L - Apply latest stash, after checking back to my working branch
8. Command + G + M - Merge branch to merge dev branch to my working branch

Neat. Isn't it?
