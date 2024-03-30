"use client";
import { useMemo, useState } from "react";
import { ChevronDown } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import SubMenuItem from "./submenu-item";

import { useRecoilState } from "recoil";
import { mobileStore , hideActiveStore } from "../../store/store";

const SidebarItem = ({ item ,  mobile }) => {
  const { name, icon: Icon, items, path } = item;
  const [expanded, setExpanded] = useState(false);

  const [mobileData,setMobileData] = useRecoilState(mobileStore)
  const [hideActive, setHideActive] = useRecoilState(hideActiveStore);

  const router = useRouter();
  const pathname = usePathname();

  const onClick = () => {
    if (items && items.length > 0) {
      return setExpanded(!expanded);
    }
    if(mobileData) {
      router.push(path);
      setHideActive(!hideActive)
    }else {
      router.push(path);
    }
  };

  const isActive = useMemo(() => {
    if(items && items.length>0){
      if(items.find(item => item.path === pathname )){
        setExpanded(true)
        return true
      }
    }
    return path === pathname;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [path, pathname,items]);

  return (
    <>
      <div
        className={`flex items-center  p-2 hover:bg-sidebar-background rounded-lg cursor-pointer hover:text-sidebar-active justify-between text-sidebar-iconColor ${
          isActive && "text-sidebar-active bg-sidebar-background"
        } `}
        onClick={onClick}
      >
        <div className="flex space-x-2 items-center">
          <Icon size={18} />
          <p className="text-sm font-semibold">{name}</p>
        </div>
        {items && items.length > 0 && (
          <ChevronDown
            size={18}
            className={expanded ? " rotate-180 duration-200" : ""}
          />
        )}
      </div>

      {expanded &&
        items &&
        items.length > 0 &&(<div
        className="flex flex-col space-y-2 ml-10 mt-2"
        >
          {items.map((item) => <SubMenuItem key={item.path} item={item} mobile={mobile} />)}
        </div>)
        }
    </>
  );
};

export default SidebarItem;
