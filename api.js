const fs = require('fs-extra');
const path = require('path');
const uuid = require('uuid').v1;

const WORK_PATH = '/Users/mitsuyama/Documents/Markdown';

const getPath = pathname => path.resolve(WORK_PATH, pathname);

const ok = data => ({ status: 200, data });

const isUuid = str => (/[a-z0-9]{8}\-[a-z0-9]{4}\-[a-z0-9]{4}\-[a-z0-9]{4}\-[a-z0-9]{12}/.test(str));

let folderList = [];
let documentList = [];
let trashList = [];
let imageList = [];

module.exports = {
  setWorkPath() {
  },
  getWorkPath() {
  },
  getFolderList() {
    const getFolderInfo = (pathname) => {
      const dirList = fs.readdirSync(getPath(pathname));
      let arr = [];
      dirList.forEach(item => {
        if(isUuid(item)) {
          const childrens = getFolderInfo(`${pathname}/${item}`);
          const info = {
            ...fs.readJSONSync(`${pathname}/${item}/_folder.json`),
            childrens,
          };
          arr.push(info);
        }
      });
      return arr;
    };
    fs.ensureDirSync(getPath('folder'));
    return ok(getFolderInfo(getPath('folder')));
  },
  getFolderContent(params) {
    console.log(params);
  },
};
