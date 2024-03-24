


import { UserButton } from "@clerk/clerk-react";
import { Link, NavLink } from "react-router-dom";


const Navbar = () => {


  const routes = [
    { href: `/`, label: 'Dashboard' },
    { href: `/categories`, label: 'Categories' },
    { href: `/products`, label: 'Products' },
    { href: `/orders`, label: 'Orders' },
  ];



    
  return (
    <header className="w-full py-4 px-4 border border-neutral-500/0.5">
      <div className="flex justify-between items-center">

        <Link to="/">
        <div className="flex items-center gap-1 cursor-pointer">
          <h1 className="text-xl font-medium">ShopCart</h1>
          <span className="text-xs text-blue-900 font-bold">Admin</span>
        </div>
        </Link>

        <div className="flex gap-10 text-neutral-500 cursor-pointer text-base font-medium">
          {routes.map((route)=>(
              <NavLink
              key={route.href}
              to={route.href}
              className={({ isActive}) =>
               isActive ? "text-black" : "hover:text-black transition"
  }
        
              >
                {route.label}
                </NavLink>
          ))}
       
            
        </div>


        <div>
        <UserButton afterSignOutUrl='/sign-in' />
        </div>
      </div>
    </header>
  );
};

export default Navbar ;
