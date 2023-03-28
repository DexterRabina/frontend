import React, { useState, useEffect } from "react";
import Paper from "@mui/material/Paper";
import axios from "axios";
import {
  TextField,
  Grid,
  Button,
  InputAdornment,
  MenuItem,
  Box,
  Typography,
} from "@mui/material";
// import { SuitType } from '../data/SuitType';

const SuitType = [
  {
    value: "Standard Suit",
    label: "Standard Suit",
  },
  {
    value: "Junior suites",
    label: "Junior suites",
  },
  {
    value: "Presidential suites",
    label: "Presidential suites",
  },
  {
    value: "Penthouse suites",
    label: "Penthouse suites",
  },
  {
    value: "Honeymoon suites",
    label: "Honeymoon suites",
  },
  {
    value: "Bridal suites",
    label: "Bridal suites",
  },
];

export default function BookingForm() {

  const [id, setId] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [suitType, setSuitType] = useState("");
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [numOfKids, setNumOfKids] = useState("");
  const [numOfAdults, setNumOfAdults] = useState("");
  const [request, setRequest] = useState("");
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    (async () => await Load())();
  }, []);

  //display
  async function Load() {
    const result = await axios.get("https://localhost:7143/api/Booking/GetBooking",);
    setBookings(result.data);
    console.log(result.data);
  }

  //add booking
  async function save(event) {
    event.preventDefault();
    try {
      await axios.post("https://localhost:7143/api/Booking/AddBooking", {
        firstName: firstName,
        lastName: lastName,
        email: email,
        phone: phone,
        address: address,
        suitType: suitType,
        checkIn: checkIn,
        checkOut: checkOut,
        numOfKids: numOfKids,
        numOfAdults: numOfAdults,
        request: request,
      });
      alert("Booking Successful");
      setId("");
      setFirstName("");
      setLastName("");
      setEmail("");
      setPhone("");
      setAddress("");
      setSuitType("");
      setCheckIn("");
      setCheckOut("");
      setNumOfKids("");
      setNumOfAdults("");
      setRequest("");

      Load();
    } catch (err) {
      alert(err);
    }
  }

  //edit booking
  async function editBooking(bookings) {
    setFirstName(bookings.firstName);
    setLastName(bookings.lastName);
    setEmail(bookings.email);
    setPhone(bookings.phone);
    setAddress(bookings.address);
    setSuitType(bookings.suitType);
    setCheckIn(bookings.checkIn);
    setCheckOut(bookings.checkOut);
    setNumOfKids(bookings.numOfKids);
    setNumOfAdults(bookings.numOfAdults);
    setRequest(bookings.request);

    setId(bookings.id);
  }

  //delete booking

  async function deleteBooking(id) {
    await axios.delete(
      "https://localhost:7143/api/Booking/DeleteBooking/" + id
    );
    alert("Booking Deleted Successfully");
    setFirstName("");
    setLastName("");
    setEmail("");
    setPhone("");
    setAddress("");
    setSuitType("");
    setCheckIn("");
    setCheckOut("");
    setNumOfKids("");
    setNumOfAdults("");
    setRequest("");
    Load();
  }

  //update booking

  async function update(event) {
    event.preventDefault();
    try {
      await axios.patch(
        "https://localhost:7143/api/Booking/UpdateBooking/" +
          bookings.find((u) => u.id === id).id || id,
        {
          id: id,
          firstName: firstName,
          lastName: lastName,
          email: email,
          phone: phone,
          address: address,
          suitType: suitType,
          checkIn: checkIn,
          checkOut: checkOut,
          numOfKids: numOfKids,
          numOfAdults: numOfAdults,
          request: request,
        }
      );
      alert("Booking Updateddddd");
      setId("");
      setFirstName("");
      setLastName("");
      setEmail("");
      setPhone("");
      setAddress("");
      setSuitType("");
      setCheckIn("");
      setCheckOut("");
      setNumOfKids("");
      setNumOfAdults("");
      setRequest("");

      Load();
    } catch (err) {
      alert(err);
    }
  }

  return (
    <div>
      <form className="mt-10">
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              name="firstName"
              label="Name"
              value={firstName}
              onChange={(event) => {
                setFirstName(event.target.value);
              }}
              fullWidth
              required
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              name="lastName"
              label="Last Name"
              value={lastName}
              onChange={(event) => {
                setLastName(event.target.value);
              }}
              fullWidth
              required
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              name="email"
              label="Email"
              value={email}
              onChange={(event) => {
                setEmail(event.target.value);
              }}
              fullWidth
              required
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              name="phone"
              label="Phone"
              value={phone}
              onChange={(event) => {
                setPhone(event.target.value);
              }}
              fullWidth
              required
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              name="address"
              label="Address"
              value={address}
              onChange={(event) => {
                setAddress(event.target.value);
              }}
              fullWidth
              required
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              name="suitType"
              label="Suit Type"
              value={suitType}
              onChange={(event) => {
                setSuitType(event.target.value);
              }}
              fullWidth
              required
              select
            >
              {SuitType.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              name="checkIn"
              label="Check In"
              type="date"
              value={checkIn}
              onChange={(event) => {
                setCheckIn(event.target.value);
              }}
              fullWidth
              required
              variant="outlined"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start"> </InputAdornment>
                ),
              }}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              name="checkOut"
              label="Check Out"
              type="date"
              value={checkOut}
              onChange={(event) => {
                setCheckOut(event.target.value);
              }}
              fullWidth
              required
              variant="outlined"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start"> </InputAdornment>
                ),
              }}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              name="numOfKids"
              label="Number of Kids"
              type="number"
              value={numOfKids}
              onChange={(event) => {
                setNumOfKids(event.target.value);
              }}
              fullWidth
              required
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              name="numOfAdults"
              label="Number of Adults"
              type="number"
              value={numOfAdults}
              onChange={(event) => {
                setNumOfAdults(event.target.value);
              }}
              fullWidth
              required
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              name="request"
              label="Special Request"
              value={request}
              onChange={(event) => {
                setRequest(event.target.value);
              }}
              fullWidth
              multiline
              rows={4}
            />
          </Grid>

          <Grid item xs={12}>
            <Button variant="contained" color="primary" onClick={save}>
              {" "}
              Book Now!{" "}
            </Button>
             <Button variant="contained" color="primary" onClick={update}>
              {" "}
              Update{" "}
            </Button>

          </Grid>

          {bookings.map(function fn(booking) {
          return (
          <Grid item xs={12}>
            <Box
                sx={{
                display: "flex",
                flexWrap: "wrap",
                "& > :not(style)": {
                    m: 1,
                    width: 600,
                    height: 350,
                },
                }}
            >
                <Paper elevation={3}>
                <Typography variant="h6">
                    Name: {booking.firstName}   {booking.lastName}
                   
                    
                </Typography>
                <Typography variant="h6">
                Phone: {booking.phone}
                </Typography>
                <Typography variant="h6">
                Sddress: {booking.address}
                </Typography>
                <Typography variant="h6">
                Suit Type: {booking.suitType}
                </Typography>
                <Typography variant="h6">
                Check in date: {booking.checkIn}
                </Typography>
                <Typography variant="h6">
                Check out date: {booking.checkIn}
                </Typography>
                <Typography variant="h6">
                Number of Kids: {booking.numOfKids}
                </Typography>
                <Typography variant="h6">
                Number of Adults: {booking.numOfAdults}
                </Typography>
                <Typography variant="h6">
                Request: {booking.request}
                </Typography>

                <Button variant="contained" color="primary" onClick={() => editBooking(booking)}>
              {" "}
              edit{" "}
            </Button>

            <Button variant="contained" color="primary" onClick={() => deleteBooking(booking.id)}>
              {" "}
              delete{" "}
            </Button>


                </Paper>
            </Box>
            </Grid>
 );
        })}
        </Grid>
      </form>
    </div>
  );
}
