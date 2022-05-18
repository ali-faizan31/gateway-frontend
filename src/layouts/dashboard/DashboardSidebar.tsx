import React, { useEffect, useState } from "react";
import { FSider, FSiderItem, FSiderSubMenuItem } from "ferrum-design-system";
import { getIcon } from "./SidebarConfig";
import { useLocation } from "react-router-dom";
import { getSideMenuForAssociatedOrganizationBySiteName } from "../../_apis/OrganizationCrud";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/rootReducer";
import { CRUCIBLE_SITE_TAG, Site_Name } from "../../utils/const.utils";

const DashboardSidebar = () => {
  const { pathname } = useLocation();
  const [sideMenuItems, setSideMenuItems] = useState();

  const { tokenV2 } = useSelector((state: RootState) => state.walletAuthenticator)

  useEffect(() => {
    getSideMenuInformation(tokenV2);
    // eslint-disable-next-line
  }, [tokenV2]);

  const getSiteName = (url: string, indexA: string, indexB: string) => {
    let substr = url.indexOf(indexA) + indexA.length;
    return url.substring(substr, url.indexOf(indexB, substr));
  };

  const getCurrenciesAgainstOrganization = (currencies: any) => {
    let currencyArray: any = [];
    currencies.length &&
      currencies.forEach((item: any) => {
        currencyArray.push({
          title: `Buy ${item.currency.symbol}`,
          icon: item.icon && getIcon(item.icon),
          target: "_blank",
          path: `${item?.currency?.currencyAddressesByNetwork[0]?.networkDex?.dex?.url}swap?inputCurrency=BNB&outputCurrency=${item?.currency?.currencyAddressesByNetwork[0]?.tokenContractAddress}&exactField=output&exactAmount=`,
          id: item._id
        });
      });
    return currencyArray;
  };

  const getSubMenuItemMenu = (item: any) => {
    let subMenuItemArray: any = [];
    let children: any = [];
    item.menuItems.forEach((subMenuItem: any) => {
      children.push({
        title: subMenuItem.name,
        icon: subMenuItem.icon && getIcon(subMenuItem.icon),
        path: `${subMenuItem.path}`,
        id: subMenuItem._id
      })
    })
    subMenuItemArray.push({
      title: item.name,
      icon: item.icon && getIcon(item.icon),
      path: item.path,
      children: children,
      id: item._id
    })
    return subMenuItemArray;
  }

  const getMenuItemInfoFromMetaData = (item: any) => {
    let menuItem: any = [];
    let externalPathData = item.metaData.find((x: any) => x.key === "externalDynamicPath");
    if (externalPathData.value) {
      menuItem.push({
        title: item.name,
        icon: item.icon && getIcon(item.icon),
        path: externalPathData.value,
        id: item._id,
        target: "_blank"
      })
    } else {
      let internalPathData = item.metaData.find((x: any) => x.key === "internalStaticPath");
      menuItem.push({
        title: item.name,
        icon: item.icon && getIcon(item.icon),
        path: internalPathData.value,
        id: item._id
      })
    }

    return menuItem;
  }

  const getSideMenuAgainstOrganization = (sideMenuItems: any) => {
    const { menu } = sideMenuItems;
    let sideMenuArray: any = [];
    menu && menu.length && menu.forEach((item: any) => {
      if (item.tags.includes("currencies")) {
        let currencies = getCurrenciesAgainstOrganization(item.menuItems);
        if (currencies.length && currencies.length > 1) {
          sideMenuArray.push({ title: "Get Token", path: "", icon: item.icon && getIcon(item.icon), id: item._id, children: currencies });
        } else {
          sideMenuArray.push(...currencies);
        }
      } else if (item.menuItems.length > 0) {
        let subMenuItemMenu = getSubMenuItemMenu(item);
        sideMenuArray.push(...subMenuItemMenu);
      } else {
        let menuItem = getMenuItemInfoFromMetaData(item);
        sideMenuArray.push(...menuItem)
      }
    });
    return sideMenuArray;
  };

  const getSideMenuInformation = async (token: any) => {
    try {
      let siteName = getSiteName(pathname, "/", "/");
      console.log(pathname, window.origin.includes(CRUCIBLE_SITE_TAG) ? 'hiii' : 'bye')
      let response = await getSideMenuForAssociatedOrganizationBySiteName(Site_Name, token,
        window.origin.includes(CRUCIBLE_SITE_TAG) ? false : true
      );
      let sideMenuItems = response && response.data && response.data.body;
      let productList = getSideMenuAgainstOrganization(sideMenuItems);
      setSideMenuItems(productList);
    } catch (e: any) {
      console.log(`Error occured: ${e?.response?.data?.status?.message}`);
    }
  };


  useEffect(() => {
  }, [sideMenuItems])


  const renderContent = (items: any) => {
    return items.map((item: any) => {
      return <FSiderItem to={item.path} title={item.title} prefix={item.icon} key={item.id} target={item.target && item.target}>
        {item?.children?.length ? (
          <FSiderSubMenuItem>
            {item.children.map((subItem: any) => {
              return <FSiderItem
                to={subItem.path}
                title={subItem.title}
                prefix={subItem.icon ? subItem.icon : <img src="/ferrum/bullet.png" className="side-menu-img" alt="side menu item" />}
                key={subItem.title}
                target={subItem.target && subItem.target}
              ></FSiderItem>
            })}
          </FSiderSubMenuItem>
        ) : ""}
      </FSiderItem>
    });
  };

  return (
    <FSider>
      {sideMenuItems && renderContent(sideMenuItems)}
    </FSider>
  );
};

export default DashboardSidebar;
