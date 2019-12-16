const Jimp = require('jimp');
const tasksLogFile = './tools/tasksLog.json';
const imagesLogFile = './tools/imagesLog.json';
const tasksCompleted = './tools/tasksCompleted.json';
const md5 = require('md5');
const fs = require('fs');
const mkdirp = require('mkdirp');



function taskInfo(res, taskId) {
    // Finding task info by taskId
    fs.readFile(tasksCompleted, (err, json) => {
        var array = JSON.parse(json);
        var tasks = array.tasks;
        var result;
        for (var i = 0; i < tasks.length; i++) {
            if (tasks[i].taskId == taskId) {
                console.log("match")
                result = tasks[i];
                res.status(200).send(result);
                return;
            } else {
                res.status(200).send("KO");
                return;
            }
        }
    });
}

function resizer(res, url) {
    // Getting fileName
    var imageName = url.replace(/^.*[\\\/]/, '');
    imageName = imageName.split('.')[0];

    // Getting an instance from the image
    Jimp.read(url)
        .then(image => {

            // Getting Md5 filename
            var imageNameMd5 = md5(imageName);

            // Setting task info
            var task = {
                taskId: 1,
                url: url,
                imageName: imageName,
                imageNameMd5: imageNameMd5,
                state: 'Resizing',
                startedTime: new Date(),
            }

            // Setting image info
            var img = {
                imageName: imageName,
                imageNameMd5: imageNameMd5,
                resolutions: ["800", "1024"],
                startedTime: new Date(),
            }

            // Saving task into a logfile with the current state (in this case I used json format)
            fs.readFile(tasksLogFile, (err, json) => {
                var array = JSON.parse(json);
                var tasks = array.tasks;
                task.taskId = tasks.length + 1;
                tasks.push(task);
                fs.writeFile(tasksLogFile, JSON.stringify(array), (err) => {
                    if (err) {
                        console.log(err);
                        res.status(500).send(error);
                    }
                });
            });

            // Saving image into a logfile with the current state (in this case I used json format)
            fs.readFile(imagesLogFile, (err, json) => {
                var array = JSON.parse(json);
                var images = array.images;
                images.push(img);
                fs.writeFile(imagesLogFile, JSON.stringify(array), (err) => {
                    if (err) {
                        console.log(err);
                        res.status(500).send(error);
                    }
                });
            });

            // As we need to create some folder I used mkdirp library create them in recursive mode

            // 1024 Folders
            try {
                // Creating 1024
                var dir = "./output/" + imageName + "/1024";
                mkdirp(dir, function (err) {
                    if (err) {
                        console.error(err)
                        res.status(500).send(error);
                    }
                });

                // Resizing image with Jimp.AUTO property to avoid to break aspect ratio
                image.resize(1024, Jimp.AUTO);

                // Writing the image on the folder created before
                image.write(dir + "/" + imageNameMd5 + "." + image.getExtension());

            } catch (error) {
                console.log(error);
                res.status(500).send(error);
            }

            // 800 Folders
            try {
                // Creating 800
                var dir = "./output/" + imageName + "/800";
                mkdirp(dir, function (err) {
                    if (err) {
                        console.error(err)
                        res.status(500).send(error);
                    }
                });

                // Resizing image with Jimp.AUTO property to avoid to break aspect ratio
                image.resize(800, Jimp.AUTO);

                // Writing the image on the folder created before
                image.write(dir + "/" + imageNameMd5 + "." + image.getExtension());

            } catch (error) {
                console.log(error);
                res.status(500).send(error);
            }

            // Saving task into a logfile with the current state (in this case I used json format)
            fs.readFile(tasksCompleted, (err, json) => {
                var array = JSON.parse(json);
                var tasks = array.tasks;
                task.taskId = tasks.length + 1;
                task.state = "Completed";
                tasks.push(task);
                fs.writeFile(tasksCompleted, JSON.stringify(array), (err) => {
                    if (err) {
                        console.log(err);
                        res.status(500).send(error);
                    }
                });
            });

            // Sending ok and TaskId to client
            res.sendStatus(200);
        })

        .catch(err => {
            // Handle an exception.
            console.log(err)
            res.status(500).send(err);
        });
}

module.exports = {
    resizer,
    taskInfo
}