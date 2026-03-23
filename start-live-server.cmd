@echo off
powershell -NoProfile -ExecutionPolicy Bypass -File "%~dp0start-live-server.ps1" -Port 5500 -BindHost 127.0.0.1 -OpenBrowser
