(function() {
     function SongPlayer(Fixtures) {
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

              SongPlayer.currentSong = song;
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
          }

          return SongPlayer;
     }

     angular
         .module('blocJams')
         .factory('SongPlayer', ['Fixtures', SongPlayer]);
 })();
