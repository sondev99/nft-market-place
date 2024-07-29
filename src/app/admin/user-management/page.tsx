'use client';

import userApi from '@/apis/userApi';
import MaxWidthWrapper from '@/components/MaxWidthWrapper';
import NullData from '@/components/NullData';
import { DataTable } from '@/components/Table';
import { GridColDef } from '@mui/x-data-grid';
import React, { useEffect, useState } from 'react';
import avatar from '@/img/avatar.jpg';
import { useUser } from '@/store/useUser';

const columns: GridColDef[] = [
  { field: 'id', headerName: 'ID', width: 90 },
  {
    field: 'img',
    headerName: 'Avatar',
    width: 100,
    renderCell: (params) => {
      return (
        <img
          className="rounded-full w-10 h-10 overflow-hidden"
          src={
            params.row.img ||
            'https://avatar.iran.liara.run/public/boy?username=Ash'
          }
          alt=""
        />
      );
    },
  },
  {
    field: 'firstName',
    type: 'string',
    headerName: 'First name',
    width: 150,
  },
  {
    field: 'lastName',
    type: 'string',
    headerName: 'Last name',
    width: 150,
  },
  {
    field: 'email',
    type: 'string',
    headerName: 'Email',
    width: 200,
  },
  {
    field: 'phone',
    type: 'string',
    headerName: 'Phone',
    width: 120,
  },
  {
    field: 'blocked',
    headerName: 'Blocked',
    width: 100,
    type: 'boolean',
  },
];

const UserManagement = () => {
  const [data, setData] = useState<UserInfo[]>([]);
  const { userInfo } = useUser();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await userApi.getAllUser();
        if (response.code === 200) {
          setData(response.data);

          console.log(response.data);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);

  if (!userInfo || userInfo.role !== 'ADMIN') {
    return <NullData title="Oops! Access denied" />;
  }

  return (
    <>
      <div className="">
        <h1 className="text-primary flex-1 text-center lg:text-left text-4xl font-bold rounded-lg !py-5 md:!py-[26px] lg:!py-5">
          User Management
        </h1>
      </div>
      <div className="flex flex-col-reverse gap-4  md:flex-col lg:flex-row lg:justify-between p-5 pt-0">
        <div className="flex flex-col gap-3">{/* <AddBannerDialog /> */}</div>
      </div>
      <div className="flex flex-col flex-1 p-5 text-primary">
        <div className="flex flex-wrap gap-2 mb-4 items-center justify-between">
          {/* <Text>
                Category:{' '}
                <Text weight={'bold'}>
                  All <Text weight={'light'}>({data ? data.length : 0})</Text>
                </Text>
              </Text> */}
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            {/* <ListBoxs /> */}
          </div>
        </div>
        <div className="mt-5 rounded-xl">
          {data.length === 0 ? (
            <NullData title="DON'T HAVE ANY USER YET" />
          ) : (
            <DataTable
              slug="user"
              columns={columns}
              rows={data}
              // editBtn={editBanner}
            />
          )}
        </div>
      </div>
    </>
  );
};

export default UserManagement;
