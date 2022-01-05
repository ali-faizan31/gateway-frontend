import React from 'react'
import { FSider, FSiderItem, FSiderSubMenuItem } from "ferrum-design-system";
import { FaCircle } from "react-icons/fa";
import { publicLeaderboardConfig, sidebarConfig } from './SidebarConfig';
import { useLocation } from 'react-router-dom';


const DashboardSidebar = () => {
  const { pathname } = useLocation();
  const isPublicLeaderboard = pathname.includes('/pub/leaderboard');
  const isPublicMultiLeaderboard = pathname.includes('/pub/multi/leaderboard');
  const isPublicCompetition = pathname.includes('/pub/competition');


  const renderContent = (items: any) => (
    // isPublicLeaderboard ? "yes" : "no"
    items.map((item: any) => (
      // console.log(item, item.children) 
      // const { title, path, icon,  children } = item;
      <FSiderItem to={item.path} title={item.title} prefix={item.icon} key={item.path}>
        {item.children && <FSiderSubMenuItem>
          {item.children.map((subItem: any) => ( 
            <FSiderItem to={subItem.path} title={subItem.title} prefix={subItem.icon} key={subItem.path}></FSiderItem>
          ))}
        </FSiderSubMenuItem>}
      </FSiderItem>
    ))
  )

  const renderTestContent = (items: any) => ( 
    items.map((item: any) => (
      // console.log(item, item.children) 
      // const { title, path, icon,  children } = item;
      <FSiderItem to={item.path} title={item.title} prefix={item.icon}>
        {/* {item.children && <FSiderSubMenuItem>
          {item.children.map((subItem: any) => {
            const { title, path, icon } = subItem;
            <FSiderItem to={path} title={title} prefix={icon}></FSiderItem>
          })}
        </FSiderSubMenuItem>} */}
      </FSiderItem>
    ))
  )

  const getSideMenuIcon = (name: any) => (
    <img src={`/ferrum/${name}.png`} height="22px" width="22px" max-height="22px" max-width="22px" />
  );


  return (
    <FSider>
      {(isPublicLeaderboard && renderContent(publicLeaderboardConfig) ||
        // (isPublicMultiLeaderboard && renderContent(publicMultiLeaderboardConfig) ||
        // (isPublicCompetition && renderContent(publicCompetitionConfig) || (
        renderContent(sidebarConfig))}
    </FSider>

    //   <FSider>
    //     <FSiderItem to="/swap" title="Leaderboard" prefix={getSideMenuIcon('leaderboard_active@2x')}>
    //       <FSiderSubMenuItem>
    //         <FSiderItem
    //           to="/url-submenuitem"
    //           title="Submenu Item"
    //           // prefix={<FaCircle />}
    //         />
    //         <FSiderItem
    //           to="/pub/multi/leaderboard/61b6d48337f5125acbbfddeb"
    //           title="Multi"
    //           // prefix={<FaCircle />}
    //         />
    //         <FSiderItem
    //           to="/url-submenuitem"
    //           title="Submenu Item"
    //           // prefix={<FaCircle />}
    //         />
    //       </FSiderSubMenuItem>
    //     </FSiderItem>
    //     <FSiderItem
    //       to="/transactions"
    //       title="Competitions"
    //       prefix={<FaCircle />}
    //     />
    // </FSider>
  )
}

export default DashboardSidebar
