Gladys Downloader
=======================

This module helps you download files threw Gladys !
Let me give you an example: You want to download a very heavy file, but you don't want to have your computer on the whole night...
Give it to Gladys ! Gladys will download the file, and emit events when the download start and finish.

You can find this module on the [Gladys Store](http://developer.gladysproject.com/en/modules/downloader).

##Installation

To install Gladys Downloader, just follow the steps : 

```bash
# Go to the hooks directory
$ cd gladys/api/hooks

# Clone the repository
$ git clone https://github.com/gladysproject/gladys-downloader downloader
$ cd downloader

# Install NPM dependencies
$ npm install

# Restart Gladys
$ sudo pm2 restart gladys
```

##Events

Gladys will emit two events : 

* When the download just started
* When the download has just finished

You can create scenario ( for example : when my download is finished, play a happy song ! :) )

##Contribute

Don't hesitate to contribute, just send me a pull request ;)