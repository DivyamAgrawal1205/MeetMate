## Hi Everyone! We're Team MATES!!
### Our team consists of Ankit Juneja - 20103061, Aryan Jindal -20103083, Divyam Agrawal(Leader)- 20103088, Anand Kataria-20103089 and Aayush Singh Panwar-20103091.
# MeetMate

## An easy to use cloud web application for your everyday online meeting needs.
![MeetMate Logo](https://user-images.githubusercontent.com/83166347/143893948-9ba5eecd-904c-44b1-9777-442319b33970.jpeg)
 

## INTRODUCTION
### MeetMate is an easy to use browser application that may help you anytime you need! It consists of various featues like Attentiveness Tracking, Speech To text, Screen Recording, Screenshot feature, PDF generation of the meeting summary and Class Status Monitoring! In other words your true mate during your meet!!

## TECHNOLOGIES USED

![Markup Language,Stylesheet Language](https://img.shields.io/badge/Markup%20Language-HTML-blue)
![Style Sheet Language](https://img.shields.io/badge/Style%20Sheet%20Language-CSS-red)
![Web Scripting Language](https://img.shields.io/badge/Web%20Scripting%20Language-JavaScript-yellow)
![Cloud Deployment Service](https://img.shields.io/badge/Cloud%20Deployment%20Tool-Heroku-blueviolet)
![Data Visualisation Tool](https://img.shields.io/badge/Data%20Visualisation%20Tool-Plotly.js-informational)
![PDF generation Tool](https://img.shields.io/badge/PDF%20Generation%20Tool-html2pdf.js-green)
![Eye Tracking Tool](https://img.shields.io/badge/Attentiveness%20module-Webgazer%2Cjs-blue)
![Media Recording Devices](https://img.shields.io/badge/Media%20recording%20Tool-mediaDevices-yellowgreen)
![Speech Recognition tool](https://img.shields.io/badge/Speech%20Recognition%20Tool-webkitSpeechRecognition-critical)


## DEPLOYMENT
### There are two ways to implement the application

#### 1.) Using our Heroku Application : [MeetMate](https://meetmate-v1.herokuapp.com/)
#### 2.) Using a local server to start the index.html file 

In order to achieve this, we show an examole of VS Code:

##### Step-1
Open Live Server Extension in VS Code: ![image](https://user-images.githubusercontent.com/83166347/143993763-8bf702b7-ff40-4d3f-9a6c-ed327d8aa0cd.png)
##### Step-2
Right Click on your .html file and choose Open with Live Server: ![image](https://user-images.githubusercontent.com/83166347/143997048-778f5197-c60d-44c5-b7fa-e9df47ab83da.png)

## FEATURES

### ATTENTIVENESS TRACKING
As we all know that sometimes we get distracted on small notice. So a basic solution to this problem is that if we get warning when ever our attention is low towards our screen, or when ever we are given a score corresponding to our attention span which will motivate user for paying attention.

  #### IMPLEMENTATION
  As soon as the user starts using MeetMate , the attentiveness tracking starts and produces a attScore at every two seconds according to criteria shown above and the attention status and attentive score is displayed to the user with a live plot of attentiveness vs time. A beep is produced when the attentiveness is too low. 
  
  As soon as MeetMate starts, webgazer.js is initiated to predict eye location on the screen and return the x & y coordinates. Then after each two seconds , we generate         attentiveness score and status by following the criteria shown in our README through x & y coordinates and a beep sound at low attentiveness. We also generate a cumulative attentiveness score in form of percentage.

  Storing all the previous scores and time stamps that generate after every two seconds in two different arrays, we plot a live attentiveness vs time graph.
  
  #### DEMONSTRATION 
  https://user-images.githubusercontent.com/83166347/144183475-8de429ef-294d-47fc-a314-fdcafc562f57.mp4



### SPEECH TO TEXT 
### SCREEN RECORDING
### CLASS STATUS WARNING
### SCREENSHOT CAPTURING




### PDF GENERATION





