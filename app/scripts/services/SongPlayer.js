(function() {
     function SongPlayer($rootScope, Fixtures) {
          var SongPlayer = {};

          /**
          *@desc current album
          *@type {Object}
          */
          var currentAlbum = Fixtures.getAlbum();

          /**
          * @desc Buzz object audio file
          * @type {Object}
          */
          var currentBuzzObject = null;

          /**
          * @function setSong
          * @desc Stops currently playing song and loads new audio file as currentBuzzObject
          * @param {Object} song
          */
          var setSong = function(song) {
              if (currentBuzzObject) {
                  currentBuzzObject.stop();
                  SongPlayer.currentSong.playing = null;
              }

              currentBuzzObject = new buzz.sound(song.audioUrl, {
                  formats: ['mp3'],
                  preload: true
              });

              currentBuzzObject.bind('timeupdate', function() {
                  $rootScope.$apply(function() {
                      SongPlayer.currentTime = currentBuzzObject.getTime();
                  });
              });

              SongPlayer.currentSong = song;

              /**
              * @desc Current playback time (in seconds) of currently playing song
              * @type {Number}
              */
              SongPlayer.currentTime = null;

              /**
              *@desc current volume from 0 to 100
              *@type {Number}
              */
              SongPlayer.volume = 40;

          };

          /**
          * @function getSongIndex
          * @desc get the index of the song
          * @param {Object} song
          */
          var getSongIndex = function(song) {
              return currentAlbum.songs.indexOf(song);
          };

          /**
          *@desc Active song object from list of songs
          *@type {Object}
          */
          SongPlayer.currentSong = null;

          var playSong = function(song){
              currentBuzzObject.play();
              song.playing = true;
          }

          /**
          *@function stopSong
          *@desc Stops current song
          *@param {Object} song
          */
          var stopSong = function(song) {
              currentBuzzObject.stop();
              song.playing = null;
          }

          /**
          *@function play
          *@desc Plays current song
          *@param {object} song
          */
          SongPlayer.play = function(song) {
              song = song || SongPlayer.currentSong;
              if (SongPlayer.currentSong !== song) {
                  setSong(song);
                  playSong(song);
              } else if (SongPlayer.currentSong === song) {
                  if (currentBuzzObject.isPaused()) {
                      playSong(song);
                  }
              }
          };

          /**
          *@function pause
          *@desc Pauses current song
          *@param {object} song
          */
          SongPlayer.pause = function(song) {
              song = song || SongPlayer.currentSong;
              currentBuzzObject.pause();
              song.playing = false;
          };

          /**
          *@function previous
          *@desc Changes to previous song
          */
          SongPlayer.previous = function() {
              var currentSongIndex = getSongIndex(SongPlayer.currentSong);
              currentSongIndex--;

              if (currentSongIndex < 0) {
                  stopSong(SongPlayer.currentSong);
              } else {
                  var song = currentAlbum.songs[currentSongIndex];
                  setSong(song);
                  playSong(song);
              }
          };

          /**
          *@function next
          *@desc Plays next song
          */
          SongPlayer.next = function() {
              var currentSongIndex = getSongIndex(SongPlayer.currentSong);
              currentSongIndex++;

              if (currentSongIndex > currentAlbum.songs.length) {
                  stopSong(songPlayer.currentSong);
              } else {
                  var song = currentAlbum.songs[currentSongIndex];
                  setSong(song);
                  playSong(song);
              }
          };

          /**
          * @function setCurrentTime
          * @desc Set current time (in seconds) of currently playing song
          * @param {Number} time
          */
          SongPlayer.setCurrentTime = function(time) {
              if (currentBuzzObject) {
                  currentBuzzObject.setTime(time);
              }
          };

          /**
          *@function setVolume
          *@desc set the volume
          *@param {Number} volume
          */
          SongPlayer.setVolume = function (volume) {
              if (currentBuzzObject) {
                  currentBuzzObject.setVolume(volume);
              }
          };

          return SongPlayer;
     }

     angular
         .module('blocJams')
         .factory('SongPlayer', ['$rootScope', 'Fixtures', SongPlayer]);
 })();
