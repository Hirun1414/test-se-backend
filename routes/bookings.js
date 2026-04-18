const express = require('express');
const {getBookings, getBooking, addBooking, updateBooking, deleteBooking} = require('../controllers/bookings');

const router = express.Router({mergeParams: true});

const { protect, authorize, checkBanned } = require('../middleware/auth');

router.route('/').get(protect, getBookings).post(protect, checkBanned, authorize('admin', 'user'), addBooking);
router.route('/:id').get(protect, getBooking).put(protect, checkBanned, authorize('admin', 'user'), updateBooking).delete(protect, checkBanned, authorize('admin', 'user'), deleteBooking);

module.exports = router;
