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

#### Step-1
Open Live Server Extension in VS Code: ![image](https://user-images.githubusercontent.com/83166347/143993763-8bf702b7-ff40-4d3f-9a6c-ed327d8aa0cd.png)
#### Step-2
Right Click on your .html file and choose Open with Live Server: ![image](https://user-images.githubusercontent.com/83166347/143997048-778f5197-c60d-44c5-b7fa-e9df47ab83da.png)

# FEATURES

## ATTENTIVENESS TRACKING
As we all know that sometimes we get distracted on small notice. So a basic solution to this problem is that if we get warning when ever our attention is low towards our screen, or when ever we are given a score corresponding to our attention span which will motivate user for paying attention.

  #### IMPLEMENTATION
  As soon as the user starts using MeetMate , the attentiveness tracking starts and produces a attScore at every two seconds according to criteria shown above and the attention status and attentive score is displayed to the user with a live plot of attentiveness vs time. A beep is produced when the attentiveness is too low. 
  
  As soon as MeetMate starts, webgazer.js is initiated to predict eye location on the screen and return the x & y coordinates. Then after each two seconds , we generate         attentiveness score and status by following the criteria shown below through x & y coordinates and a beep sound at low attentiveness. We also generate a cumulative attentiveness score in form of percentage. Storing all the previous scores and time stamps that generate after every two seconds in two different arrays, we plot a live attentiveness vs time graph.
  
  ![image](https://user-images.githubusercontent.com/83166347/144196253-bd1a9ddb-f11a-465d-8fed-d9885d9b7a7d.png)
  
  #### DEMONSTRATION 
  https://user-images.githubusercontent.com/83166347/144183475-8de429ef-294d-47fc-a314-fdcafc562f57.mp4



## SPEECH TO TEXT AND CLASS STATUS WARNING SYSTEM
Sometimes the things that the host explains is more understandable than what the lecture notes/minutes of meetings provide.Sometimes due to forced inattentiveness during online meets we tend to miss the crucial moments in the meet.

  #### IMPLEMENTATION
  When the user clicks speech-to-text Off button, the recognition starts and the user can see the speech-to-text results in the lower section of MeetMate. The program analyses each new increment in recognition result and generates a speech score to alert the user according to its value.The user has the choice to switch off speech recognition anytime he/she wants, it also alerts the user when the recognition stops due to prolonged inactivity.  
  
  After clicking sp2txt button the recognition starts and the webkitSpeechRecognition API is fetched and is made continuous.We tokenize the last sentence and analyze those tokens through a dataset and generate a speech score by adding the values of charted words. If the speech score is positive then 'All good' is notified to the user else user is notified with a 'Warning' and three small beeps.Incase the sp2txt stops itself then we warn the user with two beeps and a window alert.

  #### DEMONSTRATION


## SCREEN RECORDING
The ability to record the session is a very handful feature.This ensures that you only record the most important moments and get rid of all mundane stuff.The ability to record multiple videos is also very benifitial. 

  #### IMPLEMENTATION
  When the user clicks the RECORD button, he/she gets the option to select which window he/she wants to record.The user can stop the recording whenever he/she wants and is able to download the video by clicking the download button.MP4 format video is then downloaded in the user's local storage. 
  
  We initialize some variables that account to URL creation, setting screen and audio recording and storing video data. When the record button is clicked, we fetch the screen media source and audio of the user and consolidate both in a single variable and start the recording and then the recording data is stored and when stop recording button is clicked the recorder stops and a URL to MP4 video data is created.When the user clicks the download button, the URL is injected and a video file is downloaded in the user's local storage.
  
  #### DEMONSTRATION


## SCREENSHOT CAPTURING
The feature that helps us to quickly grab the screenshot of any window the user likes, whenever the user wants to, would prove to be very useful during any online meet.

  #### IMPLEMENTATION
  When the user clicks the Screenshot button, he/she gets the option to choose the window that she/he wants to take the screenshot of and then the screenshot is drawn with a timestamp  in the MeetMate panel.
  
  When user clicks the Screenshot button, a stream is generated to record the screen and access the first element of the video i.e. image. And then creates a map of the image and stops the recording. A canvas element is appended in the Screenshot area and the screenshot is drawn with a timestamp appended with it.
  
  #### DEMONSTRATION


## PDF GENERATION
The availability of PDF generation feature that contains both speech-to-text results and screenshots would prove to be a very handy resource during any online meet.

  #### IMPLEMENTATION
  When the user clicks the "Download PDF" button, a PDF with the clicked screenshots and speech to text results is generated with a timestamp and is downloaded in the user's local storage.
  
  When the user clicks "Download PDF" button, 'html2pdf.js' API is used to get contents from 'pdfDiv' division and saves the pdf in the user's local storage.
  
  #### DEMONSTRATION









