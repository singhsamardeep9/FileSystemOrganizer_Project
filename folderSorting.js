let fs = require("fs");
let extensionsMapping = require("./util.js");
let testFolderPath = "./Downloads";
let allFiles = fs.readdirSync(testFolderPath);
//console.log(allFiles);
for(let i = 0; i < allFiles.length; i++){
    //console.log(allFiles[i]);
    sortFiles(allFiles[i]);
}
    //sortFiles(allFiles[0]);
function getExtensions(file){
    file = file.split(".")
    return file[1];
}

function moveFile(file, extensionFolderName){
    //1.copy file from the source path to the destination path
    let sourceFile = testFolderPath+"/"+file;
    let destinationFile = extensionFolderName+"/"+file;

    fs.copyFileSync(sourceFile, destinationFile);
    fs.unlinkSync(sourceFile);
    //2. delete file from the source path
}

function checkExtensionFolder(extension){
    let extensionFolderName = testFolderPath;
    for(let key in extensionsMapping){
        let extensions = extensionsMapping[key];
        if(extensions.includes(extension)){
            extensionFolderName = extensionFolderName+"/"+key;
            break;
        }
    }
    //for eg extensionFolderName = "Documents"
    //testFolderPath = "./Downloads"
    //let folderToBeChecked = testFolderPath+"/"+extensionFolderName;
    //folderToBeChecked = "./Downloads/Documents" --> now check this path existance
    let isFolderExist =  fs.existsSync(extensionFolderName) //function that will check existance of the folder
    if(!isFolderExist){
        fs.mkdirSync(extensionFolderName);
    }
    return extensionFolderName;
}

function sortFiles(file){
    //console.log(file)
    //getExtesions
    let extension = getExtensions(file);
    //console.log(extensions);
    let extensionFolderName = checkExtensionFolder(extension);
    moveFile(file, extensionFolderName);
}