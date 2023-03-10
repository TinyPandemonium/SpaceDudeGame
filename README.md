<div align ="center">

# Spaceman Game

</div>

## Game Description

This is a simple game of spaceman that is played by clicking/tapping the letters on the screen in order to guess the correct word.
 
The theme of the game is space, however the words are anything but space themed. 
 
This game used the following languages/programs.
<div align ="center">

![](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)

![](https://img.shields.io/badge/HTML-239120?style=for-the-badge&logo=html5&logoColor=white)

![](https://img.shields.io/badge/CSS-239120?&style=for-the-badge&logo=css3&logoColor=white)

![](https://img.shields.io/badge/Visual_Studio-5C2D91?style=for-the-badge&logo=visual%20studio&logoColor=white)

</div>

## demo
Try out the game [here.](https://tinypandemonium.github.io/SpaceDudeGame/)

## Game preview

![](https://i.imgur.com/ARACXO2.png)

![](https://i.imgur.com/r5J49ux.png)

<details><summary>spoiler screenshot of winning</summary><img src ="https://i.imgur.com/9i8uA7G.png"></details>

## problems encountered 

The first iteration of the game used inputs from a keyboard rather than using buttons.

I encountered so many isuues going through that method that I just scrapped it altogether and decided to go with a button method.



I could not work out a way to to implement a line of code that would update a photo dynamically. 
<details><summary>code</summary>

```
document.getElementById("abduct").src = "./ufo" + game.getWrongGuesses() + ".png";
```

</details>

it should pull the index (0,1,2,etc.) and then update the abduct id with a different .png each time a guess is incorrect.

I didn't get a chance to implement it, but it is in the works.

I implemented a listener to stop clicks after the game is lost, but it was finicky and would stop clicks everywhere rather than just the play field.

Attempted to make the each unique area absolute rather than static(using css), but it ended up making the game looking peculiar on mobile, so I scrapped the idea (for now).

There is still a kink in the code that makes it so the incorrect word dissapears if you click another button after the game ends.

## Roadmap

- Implementing mobile/tv friendly css

- Generating a ufo image where the closer you are to losing the closer they are to abducting you. ~~spooky~~

- creating absolute areas in css so no areas go where they're no meant to

## special shoutouts


| SEI Lead Instructor | Senior Instructional Associate | Instructional Asociate | Instructional Asociate |
| :---:               | :---:                          |         :---:          |         :---:          | 
| Kenneth Chang       | Matthew Gonczar                | Evan Maloney           | Payne Fulcher


---

## resources used

- [MDN](https://developer.mozilla.org/en-US/)
- [W3Schools](https://www.w3schools.com/)
- [website used for cropping the images](https://www.remove.bg/)