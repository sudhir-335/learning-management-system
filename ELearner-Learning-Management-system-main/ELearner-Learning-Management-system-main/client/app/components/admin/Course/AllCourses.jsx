import React from 'react';
import { DataGrid } from "@mui/x-data-grid";
import { Box, Button } from "@mui/material";
import { AiOutlineDelete } from 'react-icons/ai';
import { useTheme } from "next-themes";
import { AiFillEdit } from 'react-icons/ai';
import { useGetAllCourseQuery } from '../../../../redux/features/courses/coursesApi';
import Loader from '../../Loader/Loader';
import { format } from "timeago.js"
function AllCourses() {
  const { theme } = useTheme();

  const { isLoading, data, error } = useGetAllCourseQuery({});


  const columns = [
    { field: "id", headerName: "ID", flex: 1 },
    { field: "title", headerName: "Course Title", flex: 1 },
    { field: "ratings", headerName: "Ratings", flex: 0.5 },
    { field: "purchased", headerName: "Purchased", flex: 0.5 },
    { field: "created_at", headerName: "Created At", flex: 0.5 },
    {
      field: "  ",
      headerName: "Edit",
      flex: 0.2,
      renderCell: (params) => (
        <Button>
          <AiFillEdit
            className={theme === 'dark' ? 'text-white' : 'text-black'}
            size={17}
          />
        </Button>
      ),
    },
    {
      field: " ",
      headerName: "Delete",
      flex: 0.5,
      renderCell: (params) => (
        <Button>
          <AiOutlineDelete
            className={theme === 'dark' ? 'text-white' : 'text-black'}
            size={17}
          />
        </Button>
      ),
    },
  ];

  const rows = [];
  console.log(data)
  {
    data && data.courses.forEach((item) => {
      rows.push({
        id: item._id,
        title: item.name,
        ratings: item.ratings,
        purchased: item.purchased,
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
            <Box
              m="40px 0 0 0"
              height="80vh"
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
