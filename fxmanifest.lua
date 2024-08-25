--[[
     ____   ____ _____ _____   _   _____  ________      ________ _      ____  _____  __  __ ______ _   _ _______ 
    |  _ \ / __ \_   _|_   _| | | |  __ \|  ____\ \    / /  ____| |    / __ \|  __ \|  \/  |  ____| \ | |__   __|
    | |_) | |  | || |   | |   | | | |  | | |__   \ \  / /| |__  | |   | |  | | |__) | \  / | |__  |  \| |  | |   
    |  _ <| |  | || |   | |   | | | |  | |  __|   \ \/ / |  __| | |   | |  | |  ___/| |\/| |  __| | . ` |  | |   
    | |_) | |__| || |_ _| |_  | | | |__| | |____   \  /  | |____| |___| |__| | |    | |  | | |____| |\  |  | |   
    |____/ \____/_____|_____| | | |_____/|______|   \/   |______|______\____/|_|    |_|  |_|______|_| \_|  |_|   
                              | |                                                                                
                              |_|             RGB CONTROLLER
]]

fx_version 'cerulean'
games { 'gta5', 'rdr3' }

name 'boii_rgbcontroller'
version '1.0.0'
description 'BOII | Development - RGB Controller'
author 'boiidevelopment'
repository 'https://github.com/boiidevelopment/boii_rgbcontroller'
lua54 'yes'

ui_page 'public/index.html'

files {
    'public/**/**/**',
}

server_scripts {
    'server/*'
}

client_scripts {
    'client/*'
}

escrow_ignore {
    'server/*',
    'client/*'
}