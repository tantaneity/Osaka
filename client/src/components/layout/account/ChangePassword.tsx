import React, { useState } from 'react';
import AccountLayout from '@/components/layout/account/AccountLayout';
import { Button, Input } from '@material-tailwind/react';
import { useChangePassword } from '@/hooks/useGetUsers';
import useUserStore from '@/store/UserStore';
import toast, { Toaster } from 'react-hot-toast';

const ChangePassword: React.FC = () => {
    const { user } = useUserStore();
    const changePasswordMutation = useChangePassword();

    const [formData, setFormData] = useState({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prevFormData => ({ ...prevFormData, [name]: value }));
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!formData.currentPassword || !formData.newPassword || !formData.confirmPassword) {
            toast.error("All fields must be filled");
            return;
        }

        if (formData.newPassword !== formData.confirmPassword) {
            toast.error("New password and confirm password do not match");
            return;
        }

        changePasswordMutation.mutate({
            id: user?.id!,
            currentPassword: formData.currentPassword,
            newPassword: formData.newPassword
        }, {
            onSuccess: () => {
              toast.success("Password changed successfully");
            },
            onError: () => {
                toast.error("Failed to change password");
            }
        });
    };

    return (
        <AccountLayout>
            <Toaster />
            <h2 className='text-2xl mb-4'>Change Password</h2>
            <form onSubmit={handleSubmit} className='flex flex-col gap-4 max-w-md mx-auto'>
                <Input
                    type='password'
                    name='currentPassword'
                    label='Current Password'
                    value={formData.currentPassword}
                    onChange={handleChange}
                    className='w-full' crossOrigin={undefined}                />
                <Input
                    type='password'
                    name='newPassword'
                    label='New Password'
                    value={formData.newPassword}
                    onChange={handleChange}
                    className='w-full' crossOrigin={undefined}                />
                <Input
                    type='password'
                    name='confirmPassword'
                    label='Confirm New Password'
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className='w-full' crossOrigin={undefined}                />
                <Button type='submit' fullWidth>
                    Change Password
                </Button>
            </form>
        </AccountLayout>
    );
};

export default ChangePassword;
