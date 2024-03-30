'use client'
import { useRouter ,usePathname } from 'next/navigation'
import {useMemo} from 'react'

import { useRecoilState } from 'recoil'
import { hideActiveStore , mobileStore } from '../../store/store'

const SubMenuItem = ({item}) => {
    const {name , path} = item
    const router = useRouter()
    const pathname = usePathname();

    const [mobileData,setMobileData] = useRecoilState(mobileStore)
    const [hideActive, setHideActive] = useRecoilState(hideActiveStore);

    const onClick = () => {
      if(mobileData) {
        router.push(path);
        setHideActive(!hideActive)
      }else {
        router.push(path);
      }
    }

    const isActive = useMemo(() => {
        return path === pathname;
        // eslint-disable-next-line react-hooks/exhaustive-deps
      }, [path, pathname]);
  return (
    <div 
    className={` text-sm hover:text-sidebar-active hover:font-semibold cursor-pointer ${
        isActive && "text-sidebar-active font-semibold"
    }`} 
    
    
    onClick={onClick}
    >{name}</div>
  )
}

export default SubMenuItem


