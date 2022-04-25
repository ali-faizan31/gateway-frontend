import React, { useEffect, useState } from "react";
import { FSider, FSiderItem, FSiderSubMenuItem } from "ferrum-design-system";
import {
  publicLeaderboardConfig,
  orgLeaderboardAndCompetitionSidebarConfig,
  publicMultiLeaderboardConfig,
  publicCompetitionConfig,
  tokensSidebarConfig,
  bridgeSidebarConfig,
  homeSidebarConfig,
  publicLeaderboardAndCompetitionSidebarConfig,
  crucibleConfig,
  GET_ICONS,
  GET_PATHS,
  getIcon,
  // GET_PATHS,
  // // GET_ICONS,
  // getIcon,
} from "./SidebarConfig";
import { useLocation, useParams } from "react-router-dom";
import { getSideMenuForAssociatedOrganizationBySiteName } from "../../_apis/OrganizationCrud";
import { ME_TAG, TOKEN_TAG, showCrucibleMenu } from "../../utils/const.utils";
import { T } from '../../utils/translationHelper';
import { useSelector } from "react-redux";
import { RootState } from "../../redux/rootReducer";

const DashboardSidebar = () => {
  const { id }: any = useParams();
  const { pathname } = useLocation();
  const [sideConfig, setSideConfig]: any = useState([]);
  const [sideMenuItems, setSideMenuItems] = useState();

  const isStakingLeaderboard = pathname.includes("/staking");

  const { tokenV2 } = useSelector((state: RootState) => state.walletAuthenticator)

  useEffect(() => {
    console.log(tokenV2)
    getSideMenuInformation(tokenV2);
  }, [tokenV2]);

  const getSiteName = (url: string, indexA: string, indexB: string) => {
    let substr = url.indexOf(indexA) + indexA.length;
    return url.substring(substr, url.indexOf(indexB, substr));
  };

  const getCurrenciesAgainstOrganization = (currencies: any) => {
    let currencyArray: any = [];
    console.log(currencies)
    currencies.length &&
      currencies.forEach((item: any) => {
        currencyArray.push({
          title: `Buy ${item.currency.symbol}`,
          icon: getIcon(item.icon),
          target: "_blank",
          path: `${item?.currency?.currencyAddressesByNetwork[0]?.networkDex?.dex?.url}swap?inputCurrency=BNB&outputCurrency=${item?.currency?.currencyAddressesByNetwork[0]?.tokenContractAddress}&exactField=output&exactAmount=`,
        });
      });
    console.log(currencyArray)
    return currencyArray;
  };

  const getSubscriptionListAgainstOrganization = (sideMenuItems: any) => {
    const { menu } = sideMenuItems;
    console.log(menu)
    let sideMenuArray: any = [];
    menu && menu.length && menu.forEach((item: any) => {
      if (item.tags.includes("currencies")) {
        let currencies = getCurrenciesAgainstOrganization(item.menuItems);
        if (currencies.length && currencies.length > 1) {
          sideMenuArray.push({ title: "Get Token", path: "", icon: GET_ICONS("Token"), children: currencies });
        } else {
          sideMenuArray.push(...currencies);
        }
      } else if (item.menuItems.length > 0) {

      } else {

      }



      // let productName = item.product.name;
      // console.log(productName, item)
      // if (item[productName]) {
      //   console.log(item[productName])
      //   item[productName].length > 0 &&
      //     item[productName].forEach((child: any) => {
      //       child.title = child.name;
      //       child.path = GET_PATHS(
      //         productName,
      //         child._id,
      //         child.numberOfCurrencies
      //       );
      //     });
      //   sideMenuArray.push({
      //     title: productName,
      //     path: "",
      //     icon: GET_ICONS(productName),
      //     children: item[productName],
      //   });
      // }
    });
    // let currencies = getCurrenciesAgainstOrganization(sideMenuItems.currencies);
    // if (currencies.length && currencies.length > 1) {
    //   sideMenuArray.push({ title: "Get Token", path: "", icon: GET_ICONS("Token"), children: currencies, });
    // } else {
    //   sideMenuArray.push(...currencies);
    // }
    console.log(sideMenuArray)
    return sideMenuArray;
  };

  const getSideMenuInformation = async (token: any) => {
    try {
      let siteName = getSiteName(pathname, "/", "/");
      let response = await getSideMenuForAssociatedOrganizationBySiteName("fixadmin.ferrumnetwork.io", token, showCrucibleMenu ? false : true);
      let sideMenuItems = response && response.data && response.data.body;
      console.log(sideMenuItems)
      let productList = getSubscriptionListAgainstOrganization(sideMenuItems);
      setSideMenuItems(productList);
    } catch (e: any) {
      console.log(`Error occured: ${e?.response?.data?.status?.message}`);
    }
  };

  const renderContent = (items: any) => {
    return items.map((item: any, index: any) => (
      <>
        {
          <FSiderItem to={item.path} title={item.title} prefix={item.icon} key={index} target={item.target && item.target}>
            {item?.children?.length ? (
              <FSiderSubMenuItem>
                {item.children.map((subItem: any, sudIndex: any) => (
                  <FSiderItem
                    to={subItem.path}
                    title={subItem.title}
                    prefix={subItem.icon ? subItem.icon : <img src="/ferrum/bullet.png" className="side-menu-img" alt="side menut item" />}
                    key={sudIndex}
                    target={subItem.target && subItem.target}
                  ></FSiderItem>
                ))}
              </FSiderSubMenuItem>
            ) : ""}
          </FSiderItem>
        }
      </>
    ));
  };

  return (
    <FSider>
      {renderContent(homeSidebarConfig)}
      {sideMenuItems && renderContent(sideMenuItems)}
      {/* {localStorageHelper.load(ME_TAG)?.role === ORG_ROLE_TAG
        ? renderContent(orgLeaderboardAndCompetitionSidebarConfig)
        : renderContent(publicLeaderboardAndCompetitionSidebarConfig)} */}
      {/* {isStakingLeaderboard && renderContent(sideConfig)}  update for fomo */}
      {/* {renderContent(tokensSidebarConfig)}
      {renderContent(bridgeSidebarConfig)}
      {showCrucibleMenu && renderContent(crucibleConfig)} */}
    </FSider>
  );
};

export default DashboardSidebar;
