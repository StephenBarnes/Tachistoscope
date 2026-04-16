We want to create a *tachistoscope* tool as a single-page website.

The goal is to help people memorize long ordered sequences - for example, the Greek alphabet.
The tachistoscope should allow users to enter an ordered sequence of lines of text. When the tachistoscope "plays", we display these in order, occupying as much of the screen as possible, with big text.

Let's make this using plain JS + CSS + HTML.

When we're not actively playing the tachistoscope (showing lines in sequence rapidly), we show some settings and controls:
* A configurable delay, ranging from 20 milliseconds to 2000 milliseconds
* A text-box where the user can enter any number of lines to display
* A dropdown list for selecting various pre-written sets of text lines (such as the Greek alphabet)
* A "play" button - when pressed, hides the controls and instead shows the lines of text in sequence

