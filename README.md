# Skrievo Discord Ticket System

A fully customizable and advanced Discord ticketing system with
category-based ticket creation, auto-close functionality, transcripts,
logging, and OAuth2 web integration.

------------------------------------------------------------------------

## 📦 Installation

### 1. Download the Project

Clone or download the repository to your system.

### 2. Install Dependencies

Run the following command in the project directory:

    npm install

### 3. Configure the Bot

Edit the configuration file located at:

    /config/config.js

### 4. Start the Bot

Use the command:

    node index.js

------------------------------------------------------------------------

## ⚙️ Configuration Overview

This section explains the most important parts of the configuration
file.

------------------------------------------------------------------------

## 🏛️ Guild Configuration

### **Guild ID**

The ID of the Discord server where the bot will operate:

    config.guildid = ""

------------------------------------------------------------------------

## 🤖 Bot Settings

Configure bot identity, activity rotation, and appearance:

    config.bot = {
        name: "Ticket System",
        color: "#2b2b2b",
        avatar: "URL",
        activitys: [...],
        intervall: 10 * 1000
    }

### Includes:

-   Bot name\
-   Embed color\
-   Avatar URL\
-   Rotating activity statuses\
-   Status update interval

------------------------------------------------------------------------

## 👮 Admin Roles

Roles allowed to manage transcripts and administrative commands:

    config.adminroles = ["ROLE_ID"]

------------------------------------------------------------------------

## 🎫 Ticket Menu Configuration

Controls the appearance of the main ticket panel: - Title\
- Description\
- Icons and images\
- Footer\
- Timestamp

Ideal for branding your support system.

------------------------------------------------------------------------

## 🛠️ Ticket System Settings

### Close Button

    buttons: [
        { name: "Close", style: 4, emoji: "🔒" }
    ]

### Maximum Tickets Per User

    maxtickets: 4

### Auto Deletion / Archiving

    delonclose: true
    archivecategory: ["CATEGORY_ID"]

### Transcript Options

    transcript.saveindc = false
    transcript.saveImages = true
    transcript.saveVideos = true

------------------------------------------------------------------------

## 📩 User DM Messages

### DM on Ticket Close

Automatic DM notification:

    senduserdm: true
    userdm: { ... }

### Auto-Close Warnings

If a user does not respond for 24 hours:

    autoclose.embed
    autoclose.cancel

------------------------------------------------------------------------

## 🗂️ Ticket Categories

Each category defines: - Name\
- Description\
- Emoji\
- Category ID\
- Ticket channel format\
- Permission roles\
- Custom embeds

Example:

    {
      name: "Buy",
      description: "Purchase requests",
      emoji: "🛒",
      categoryid: "ID",
      channel: "💸︱{username}",
      perms: ["ROLE_ID"],
      embed: { ... }
    }

------------------------------------------------------------------------

## 🌐 Web Server & OAuth2 Integration

    config.server = {
      ip: "192.168.5.50",
      port: 3000,
      https: false,
      proxy: { ... },
      oauth2: { ... }
    }

Provides: - Web dashboard - Discord login via OAuth2 - Proxy/domain
support

------------------------------------------------------------------------

## 📜 Logging System

Each important ticket action can be logged:

    open, close, rename, add, remove, autoclose

Each log uses a unified embed design:

    config.logs.embed = { ... }

------------------------------------------------------------------------

## 🔗 OAuth2 Redirect URL

Required for Discord login:

    config.redirect_url = "https://tickets.codebotz.net/auth"

------------------------------------------------------------------------

## ✅ Summary

This Ticket Bot provides: - Full customization\
- Multi-category support\
- Auto-close with notifications\
- Professional logging\
- Secure OAuth2 web integration\
- Modern and scalable design

Perfect for professional support teams, development groups, and any
community needing structured ticket management.

------------------------------------------------------------------------

If you need help customizing the system or want a fully branded version,
feel free to reach out!

