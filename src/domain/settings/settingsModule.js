'use strict';

const { MSettings } = require('mongoose').models;

const updateByUser = async (userid, data) => {
    let setting = await getByUser(userid);
    if (setting) {
        if (data.theme) {
            setting.theme.name = data.theme.name
                ? data.theme.name
                : setting.theme.name;
            setting.theme.path = data.theme.path
                ? data.theme.path
                : setting.theme.path;
        }
        if (data.layout) {
            setting.layout.topSideBar.backgroundColor = data.layout.topSideBar
                ? data.layout.topSideBar.backgroundColor
                : setting.layout.topSideBar.backgroundColor;

            setting.layout.bandTitle.fontColor = data.layout.bandTitle
                ? data.layout.bandTitle.fontColor
                : setting.layout.bandTitle.fontColor;
            setting.layout.bandTitle.backgroundColor = data.layout.bandTitle
                ? data.layout.bandTitle.backgroundColor
                : setting.layout.bandTitle.backgroundColor;

            setting.layout.buttons.class = data.layout.buttons
                ? data.layout.buttons.class
                : setting.layout.buttons.class;
            setting.layout.buttons.backgroundColor = data.layout.buttons
                ? data.layout.buttons.backgroundColor
                : setting.layout.buttons.backgroundColor;
            setting.layout.buttons.hoverColor = data.layout.buttons
                ? data.layout.buttons.hoverColor
                : setting.layout.buttons.hoverColor;

            setting.layout.hasAvatar =
                data.layout.hasAvatar != null
                    ? data.layout.hasAvatar
                    : setting.layout.hasAvatar;
        }
    } else {
        setting = new MSettings();
        setting.user = userid;
        setting = await MSettings.create(setting);
        if (data.theme) {
            setting.theme.name = data.theme.name ? data.theme.name : null;
            setting.theme.path = data.theme.path ? data.theme.path : null;
        }
        if (data.layout) {
            setting.layout.topSideBar.backgroundColor = data.layout.topSideBar
                ? data.layout.topSideBar.backgroundColor
                : null;
            setting.layout.bandTitle.fontColor = data.layout.bandTitle
                ? data.layout.bandTitle.fontColor
                : null;
            setting.layout.bandTitle.backgroundColor = data.layout.bandTitle
                ? data.layout.bandTitle.backgroundColor
                : null;

            setting.layout.buttons.class = data.layout.buttons
                ? data.layout.buttons.class
                : null;
            setting.layout.buttons.backgroundColor = data.layout.buttons
                ? data.layout.buttons.backgroundColor
                : null;
            setting.layout.buttons.hoverColor = data.layout.buttons
                ? data.layout.buttons.hoverColor
                : null;

            setting.layout.hasAvatar = data.layout.hasAvatar
                ? data.layout.hasAvatar
                : null;
        }
    }
    await setting.save();
    return setting;
};

const getByUser = async (userid) => {
    return MSettings.findOne({
        user: userid,
    });
};

const getById = async (id) => {
    return await MSettings.getById(id);
};

module.exports = {
    updateByUser,
    getByUser,
    getById,
};
