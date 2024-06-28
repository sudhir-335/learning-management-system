import React, { useState } from 'react';
import { DataGrid } from "@mui/x-data-grid";
import { Box, Button } from "@mui/material";
import { AiOutlineDelete } from 'react-icons/ai';
import { useTheme } from "next-themes";
import { AiFillEdit } from 'react-icons/ai';
import { AiOutlineMail } from 'react-icons/ai';
import { styles } from '../../../styles/style';
// import { useGetAllCourseQuery } from '../../../../redux/features/courses/coursesApi';
import Loader from '../../Loader/Loader';
import { format } from "timeago.js"
import { useGetUsersQuery } from '../../../../redux/features/user/userApi';


function AllCourses({ isTeam }) {
  const { theme } = useTheme();

  const { isLoading, data, error } = useGetUsersQuery({});

  const [active, setActive] = useState(0)


  const columns = [
    { field: "id", headerName: "ID", flex: 0.3 },
    { field: "name", headerName: "Name", flex: 0.5 },
    { field: "email", headerName: "Email", flex: 1 },
    { field: "role", headerName: "Role", flex: 0.3 },
    { field: "courses", headerName: "Purchased Courses", flex: 0.5 },
    { field: "created_at", headerName: "Created At", flex: 0.5 },
    {
      field: " ",
      headerName: "Delete",
      flex: 0.3,
      renderCell: (params) => (
        <Button>
          <AiOutlineDelete
            className={theme === 'dark' ? 'text-white' : 'text-black'}
            size={17}
          />
        </Button>
      ),
    },
    {
      field: "  ",
      headerName: "Email",
      flex: 0.5,
      renderCell: (params) => {
        return (
          <Button>
            <a
              href={`mailto:${params.row.email}`}
            >
              <AiOutlineMail
                className={theme === 'dark' ? 'text-white' : 'text-black'}
                size={17}
              />
            </a >
          </Button>

        )

      },
    },
  ];

  const rows = [];
  // console.log(data)

  if (isTeam) {

    const newData = data && data.users.filter((item) => item.role === 'admin');

    newData && newData.forEach((item) => {
      rows.push({
        id: item._id,
        name: item.name,
        email: item.email,
        role: item.role,
        courses: item.courses.length,
        created_at: format(item.createdAt),
      })
    })
  }
  else {
    data && data.users.forEach((item) => {
      rows.push({
        id: item._id,
        name: item.name,
        email: item.email,
        role: item.role,
        courses: item.courses.length,
        created_at: format(item.createdAt),
      })
    })
  }

  return (
    <div className='mt-[120px]'>
      {
        isLoading ? (
          <Loader />
        ) : (
          <Box m="20px">
            <div className='w-full flex justify-end'>
              <div className='w-full 800px:w-[180px] flex items-center justify-center h-[40px] bg-[#37a39a] text-center text-white rounded mt-8 mb-3 cursor-pointer'
                onClick={() => { }}>
                Add New Member
              </div>
            </div>
            <Box
              m="40px 0 0 0"
              height="65vh"
              sx={{
                '& .MuiDataGrid-root': {
                  border: 'none',
                  outline: 'none',
                },
                '& .MuiDataGrid-row': {
                  color: theme === 'dark' ? '#fff' : '#000',
                  borderBottom: theme === 'dark' ? '1px solid #ffffff30 !important' : '1px solid #000 !important',
                },
                '& .MuiDataGrid-columnHeader, .MuiDataGrid-columnHeaderTitle': {
                  backgroundColor: theme === 'dark' ? '#3e4396' : '#A4A9FC',
                  color: theme === 'dark' ? '#fff' : '#000',
                  borderBottom: 'none',
                },
                '& .MuiDataGrid-virtualScroller': {
                  color: theme === 'dark' ? '#1F2A40' : '#F2F0F0',
                },
                '& .MuiDataGrid-footerContainer': {
                  backgroundColor: theme === 'dark' ? '#3e4396' : '#A4A9FC',
                  borderTop: 'none',
                },
                '& .MuiCheckbox-root': {
                  color: theme === 'dark' ? '#b7ebde !important' : '#000 !important',
                },
              }}
            >
              <DataGrid checkboxSelection rows={rows} columns={columns} />
            </Box>
          </Box>
        )
      }
    </div>
  );
}

export default AllCourses;
