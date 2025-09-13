@echo off
echo === Cleaning Android build and node_modules ===

REM Go to project root
cd /d I:\React-native\myapp

REM Remove android build folders
rd /s /q android\app\.cxx
rd /s /q android\app\build
rd /s /q android\build

REM Remove node_modules
rd /s /q node_modules

REM Remove lock files if they exist
del package-lock.json
del yarn.lock

echo === Cleanup done! ===
pause
