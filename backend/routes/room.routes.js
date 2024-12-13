const express = require('express');
const router = express.Router();
const {
    getRooms,
    getRoomsByHotelId,
    createRoom,
    updateRoom,
    deleteRoom
} = require('../controllers/room.controller');

// Routes
router.get('/', getRooms);
router.get('/:id', getRoomsByHotelId);
router.post('/', createRoom);
router.put('/:id', updateRoom);
router.delete('/:id', deleteRoom);

module.exports = router;
