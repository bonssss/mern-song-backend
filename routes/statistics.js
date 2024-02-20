const express =require('express');
const router = express.Router();
const Song = require('../models/Song');

// get overall statistics

router.get('/statistics', async(req,res)=>{
    try {
        const totalSongs = await Song.countDocuments();
        const totalArtists = (await Song.distinct('artist')).length;
        const totalAlbums = (await Song.distinct('album')).length;
        const totalGenres = (await Song.distinct('genre')).length;


        const genreCounts = await Song.aggregate([
            {$group: {_id: '$genre', count:{$sum: 1}}}
        ]);

        
        const artistCounts = await Song.aggregate([
            {$group: {_id: '$artist', count:{$sum: 1}}}
        ]);

        
        const albumCounts = await Song.aggregate([
            {$group: {_id: '$album', count:{$sum: 1}}}
        ]);

        res.json({
            totalSongs,
            totalArtists,
            totalAlbums,
            totalGenres,
            genreCounts,
            artistCounts,
            albumCounts
        });



    } catch (error) {
        res.status(500).json({message:error.message});
        
    }
});

module.exports = router;