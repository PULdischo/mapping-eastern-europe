

https://stackoverflow.com/questions/76874716/shuffle-html-elements-before-the-browser-tries-to-render-them-is-this-a-rare-va


build your HTML without any image and then randomize images directly adding them via JS. 

add from data rather than 11ty-HTML

x 11ty data to json in template
x randomize the order of the data 
x load the data in Shuffle
- but not with image and figcaption (because we need search for more than is visible...)
- add image and figcaption as user scrolls down the screen 

1. load the collection for search, but only display 15 images
2. on search, make results visible

a. need a way to hide/reveal/not load image and caption 


b. need to load more images on scroll down 
    - https://developer.mozilla.org/en-US/play

c. or just continue adding images after initial load pseudo-lazy-load


May 21 starting on map 
