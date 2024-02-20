const express = require('express');
const router = express.Router();
const Song = require('../models/Song');

// get all songs 

router.get('/songs', async (req, res) => {
    try {
        const songs = await Song.find();
        res.json(songs);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});
// add new songs

router.post('/songs', async (req,res)=>{
    const song = new Song({
        title: req.body.title,
        artist:req.body.artist,
        album: req.body.album,
        genre: req.body.genre
    });

    try{
        const newSong= await song.save();
        res.status(201).json(newSong);
    } catch(error){
        res.status(400).json({message:error.message});
    }
})

// router.post('/api/songs', async (req, res) => {
//     const { title, artist, album, genre } = req.body;
//     const newSong = new Song({ title, artist, album, genre });

//     try {
//         const savedSong = await newSong.save();
//         res.status(201).json(savedSong);
//     } catch (error) {
//         res.status(400).json({ message: error.message });
//     }
// });



//getting single song

router.get('/songs/:id',getSong,(req,res)=>{
    res.json(res.Song);
})

// update songs

router.patch('/songs/:id',getSong,async (req,res)=>{

    if (req.body.title != null) {
        res.song.title = req.body.title;
    }
    if (req.body.artist != null) {
        res.song.artist = req.body.artist;
    }
    if (req.body.album != null) {
        res.song.album = req.body.album;
    }
    if (req.body.genre != null) {
        res.song.genre = req.body.genre;
    }

    try {
        const updatedSong = await res.song.save();
        res.json(updatedSong);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});




async function getSong(req, res, next) {
    try {
        const song = await Song.findById(req.params.id);
        if (!song) {
            return res.status(404).json({ message: 'Song not found' });
        }
        res.song = song;
        next();
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

// DELETE route to delete a song by ID
// router.delete('/songs/:id', getSong, async (req, res) => {
//     try {
//         await res.song.remove();
//         res.json({ message: 'Song deleted' });
//     } catch (error) {
//         res.status(500).json({ message: error.message });
//     }
// });

router.delete('/songs/:id', async (req, res) => {
    const { id } = req.params;
    try {
      const deletedSong = await Song.findByIdAndDelete(id);
      if (!deletedSong) {
        return res.status(404).json({ message: 'Song not found' });
      }
      res.json({ message: 'Song deleted successfully', deletedSong });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });





// Delete a song by ID
// router.delete('/songs/:id', getSong, async (req, res) => {
//     try {
//         await res.song.remove();
//         res.json({ message: 'Song deleted' });
//     } catch (error) {
//         res.status(500).json({ message: error.message });
//     }
// });

// // Middleware function

// async function getSong(req,res,next) {
//     try {
//         song =await Song.findById(req.params.id);
//         if(song == null){
//             return res.status(404).json({message:'Song not found'});
//         }
        
//     } catch (error) {
//         return res.status(500).json({message:error.message});
        
//     }
//     res.song = song;
//     next();
// }

module.exports = router;