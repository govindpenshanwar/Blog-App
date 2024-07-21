import axios from "axios";
import React, { useEffect, useState } from "react";
import baseUrl from ".././../utils/baseUrl";
import Loading from "../../utils/Loading";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import { InputAdornment, TextField } from "@mui/material";
import SearchSharp from "@mui/icons-material/SearchSharp";
import toast from 'react-hot-toast'
const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    "&:nth-of-type(odd)": {
        backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    "&:last-child td, &:last-child th": {
        border: 0,
    },
}));
function AllUserPage() {
    const [users, setUsers] = useState([]);
    const [searchQuery, setSearchQuery] = useState('')
    const [isLoading, setisLoading] = useState(false);
    const limit = 10;
    const [viewAll, setViewAll] = useState(false);
    const [toggle, setToggle] = useState(false)
    useEffect(() => {
        const fetchUsers = async () => {
            setisLoading(true);
            try {
                const res = await axios.get(`${baseUrl}/api/user/users`, {
                    withCredentials: true,
                });
                const limitedUsers = viewAll ? res.data.payload : res.data.payload.slice(0, limit);
                setUsers(limitedUsers)
                setisLoading(false);

            } catch (error) {
                console.log("err fetching users= >", error.message);
                setisLoading(false);
            }
        };
        fetchUsers();
    }, [viewAll, toggle]);

    if (isLoading) {
        return <Loading />;
    }

    const filtedredInputs = users.filter((user) => (
        user.username.toString().toLowerCase().includes(searchQuery.toString().toLowerCase())
    ))

    const handleDeleteUser = async (id) => {
        try {
            const res = await axios.delete(`${baseUrl}/api/user/delete/${id}`, { withCredentials: true });
            res.data.statusCode === 200 ? toast.success(res.data.message) : toast.error(res.data.message)
            setToggle(prevState => !prevState)
        } catch (error) {
            console.log("err deleting user => ", error.message)
        }
    }
    return (
        <div className="px-4 py-4">
            <div className="flex md:flex-row flex-col md:justify-between justify-center gap-5 items-center py-4">
                <p className="font-semibold text-xl font-sans">All Users</p>
                <TextField
                    label="Search User"
                    variant="outlined"
                    className="md:w-[18rem] w-[20rem] md:self-end self-center"
                    InputProps={{
                        startAdornment: <InputAdornment position="start"><SearchSharp /></InputAdornment>
                    }}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
            </div>
            <div className="flex justify-end py-2 px-2">
                <span
                    className="cursor-pointer self-end text-lg font-semibold"
                    onClick={() => setViewAll(prev => !prev)}>
                    {viewAll ? "View Less" : "View All"}
                </span>
            </div>


            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 700 }} aria-label="customized table">
                    <TableHead>
                        <TableRow>
                            <StyledTableCell align="center">Sr.no</StyledTableCell>
                            <StyledTableCell align="center">Username</StyledTableCell>
                            <StyledTableCell align="center">Email</StyledTableCell>
                            <StyledTableCell align="center">Delete</StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {filtedredInputs.map((user, index) => (
                            <StyledTableRow key={user._id}>
                                <StyledTableCell align="center">{index + 1}</StyledTableCell>
                                <StyledTableCell component="th" scope="row" align="center">
                                    {user.username}
                                </StyledTableCell>
                                <StyledTableCell align="center">{user.email}</StyledTableCell>
                                <StyledTableCell align="center">
                                    <DeleteOutlineOutlinedIcon
                                        className="hover:scale-110 cursor-pointer text-red-600 transition-all"
                                        onClick={() => {
                                            handleDeleteUser(user._id)
                                        }}
                                    />
                                </StyledTableCell>
                            </StyledTableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
}

export default AllUserPage;
