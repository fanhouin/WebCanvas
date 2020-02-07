# Software Studio 2018 Spring Assignment 01 Web Canvas

Link: https://106062363.gitlab.io/AS_01_WebCanvas/

## Library
### fontawesome
工具列的圖案都是由fontawesome找出來

---

## Function
### input
* color : 可以選擇不同的顏色。
* range : 透過拉動調校pixel值。
---
### brush and eraser 
* brush : 根據input決定畫筆的顏色和大小。
* eraser : 根據input決定橡皮刷的大小，但顏色是白色。
---
### Text input
* font menu : 有兩個下拉選單，分別選擇字型和字的大小。
* textbox : 可以在canvas中任何一處點一下，就會出現textbox，如果地方不合適可以重新點其他地方，打完字後按enter就可以印出textbox裡的字。
---
### Cursor icon
* different icon : 每次點選工具後遊標都會變為那個工具的icon
---
### Circle, rectangle, triangle and line 
* circle : 以圓的中心為起點，x,y軸之間取最大為半徑，畫出圓形。
* rectangle : 使用ctx.rect()畫出矩形。
* triangle : 使用兩個ctx.lineTo()，然後ctx.closePath()畫出三角形。
* line : 畫線條。

### Un/Re-do/Refresh button
* refresh button : 按完之後會彈出confirm視窗，問閣下是否要refresh，是就會，不是就不會。
* undo : 因為每畫完一次，都會儲存圖片的URL，undo可以返回上一個URL。
* redo : redo可以返回下一個URL，如果undo後又畫了一筆，就變成最新的狀態，所以不能redo了。

### Upload/Download
* upload : 可以上載圖片貼在canvas上。
* download : 可以下載圖片。

---

## Demo
<img src="demo.gif" width="690px" height="388px"></img>

