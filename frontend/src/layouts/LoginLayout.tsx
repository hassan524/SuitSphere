import { Outlet } from "react-router-dom";

const LoginLayout = () => {
  return (
    <div className="flex justify-center gap-5 lg:pt-14 pt-[4.5rem] px-7">
      <div className="lg:w-1/2 w-full lg:flex hidden justify-center items-center">
        <img className="w-[30rem]" src="/images/login2.avif" alt="" /></div>
      <div className="lg:w-1/2 w-full flex justify-center items-center">
        <Outlet />
      </div>
    </div>
  );
};

export default LoginLayout;
