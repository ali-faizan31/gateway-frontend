import React, { useEffect, useState } from "react";
import { FSider, FSiderItem, FSiderSubMenuItem } from "ferrum-design-system";
import toast, { Toaster } from "react-hot-toast";
import { useSelector, RootStateOrAny } from "react-redux";
import {
  publicLeaderboardConfig,
  sidebarConfig,
  publicMultiLeaderboardConfig,
  publicCompetitionConfig,
  tokensSidebarConfig,
  bridgeSidebarConfig,
  homeSidebarConfig,
  communityLeaderboardSidebarConfig,
  crucibleConfig,
  GET_PATHS,
  GET_ICONS,
  getCurrencyIcon,
} from "./SidebarConfig";
import { useLocation, useParams } from "react-router-dom";
import { PATH_DASHBOARD } from "../../routes/paths";
import { getLeaderboardByIdForPublicUser, getAllLeaderboards } from "../../_apis/LeaderboardCrud";
import { getCompetitionByIdForPublicUser, getAllCompetitions } from "../../_apis/CompetitionCrud";
import { localStorageHelper } from "../../utils/global.utils";
import { ME_TAG, TOKEN_TAG } from "../../utils/const.utils";
import { getSubscriptionInformationForAssociatedOrganizationBySiteName } from "../../_apis/OrganizationCrud";

const DashboardSidebar = () => {
  const { id }: any = useParams();
  const { pathname } = useLocation();
  let token = localStorage.getItem(TOKEN_TAG);
  const [sideConfig, setSideConfig]: any = useState([]);
  const [sideMenuItems, setSideMenuItems] = useState([]);
  const { competitionList } = useSelector((state: RootStateOrAny) => state.competition);
  const { leaderboardList } = useSelector((state: RootStateOrAny) => state.leaderboard);
  const isPublic = pathname.includes("/pub");
  const isPublicLeaderboard = pathname.includes("/pub/leader");
  const isStakingLeaderboard = pathname.includes("/staking");
  const isPublicMultiLeaderboard = pathname.includes("/pub/multi/leaderboard");
  const isPublicCompetition = pathname.includes("/pub/competition");

  useEffect(() => {
    // getSideMenuInformation();
  }, []);

  const getSiteName = (url: string, indexA: string, indexB: string) => {
    let substr = url.indexOf(indexA) + indexA.length;
    return url.substring(substr, url.indexOf(indexB, substr));
  };

  const getCurrenciesAgainstOrganization = (currencies: any) => {
    let currencyArray: any = [];
    currencies.length &&
      currencies.forEach((currency: any) => {
        currencyArray.push({
          title: currency.name,
          icon: getCurrencyIcon(currency.logo),
          target: "_blank",
          path: `${currency?.cabn?.networkDex?.dex?.url}swap?inputCurrency=BNB&outputCurrency=${currency?.cabn?.tokenContractAddress}&exactField=output&exactAmount=`,
        });
      });
    return currencyArray;
  };

  const getSubscriptionListAgainstOrganization = (subscriptionResponse: any) => {
    const { subscriptions } = subscriptionResponse;
    let subsciptionArray: any = [];
    subscriptions.forEach((item: any) => {
      let productName = item.product.name;
      if (item[productName]) {
        item[productName].length > 0 &&
          item[productName].forEach((child: any) => {
            child.title = child.name;
            child.path = GET_PATHS(productName, child._id, child.numberOfCurrencies);
          });
        subsciptionArray.push({
          title: productName,
          path: "",
          icon: GET_ICONS(productName),
          children: item[productName],
        });
      }
    });
    let currencies = getCurrenciesAgainstOrganization(subscriptionResponse.currencies);
    if (currencies.length && currencies.length > 1) {
      subsciptionArray.push({
        title: "Get Token",
        path: "",
        icon: GET_ICONS("Token"),
        children: currencies,
      });
    } else {
      subsciptionArray.push(...currencies);
    }
    return subsciptionArray;
  };

  // const getSideMenuInformation = async () => {
  //   try {
  //     let siteName = getSiteName(pathname, "/", "/");
  //     let response = await getSubscriptionInformationForAssociatedOrganizationBySiteName(siteName);
  //     let subscriptionResponse = response && response.data && response.data.body;
  //     let productList = getSubscriptionListAgainstOrganization(subscriptionResponse);
  //     setSideMenuItems(productList);
  //   } catch (e: any) {
  //     toast.error(`Error occured: ${e.response.data.status.message}`);
  //   }
  // };

  useEffect(() => {
    if (id !== ":id") {
      if (isPublic) {
        if (isStakingLeaderboard || isPublicLeaderboard || isPublicMultiLeaderboard) {
          getPublicLeaderboard();
        }
        if (isPublicCompetition) {
          getPublicCompetition();
        }
      }
      // else {
      //   getSidebarItems();
      // }
    }
  }, [id]);

  const getPublicLeaderboard = () => {
    getLeaderboardByIdForPublicUser(id)
      .then((res: any) => {
        if (res?.data?.body?.leaderboard) {
          const { leaderboard } = res.data.body;
          let mappedData = [];
          if (isPublicMultiLeaderboard) {
            mappedData = [
              {
                title: leaderboard.name,
                _id: leaderboard._id,
                path: `/pub/multi/leaderboard/${leaderboard._id}`,
              },
            ];
          } else if (isStakingLeaderboard) {
            mappedData = [
              {
                title: leaderboard.name,
                _id: leaderboard._id,
                path: `/pub/staking/leaderboard/${leaderboard._id}`,
              },
            ];
          } else {
            mappedData = [
              {
                title: leaderboard.name,
                _id: leaderboard._id,
                path: `/pub/leaderboard/${leaderboard._id}`,
              },
            ];
          }
          updatePublicLeaderboardConfig(mappedData);
        }
      })
      .catch((e: any) => {
        if (e.response) {
          toast.error(e?.response?.data?.status?.message);
        } else {
          toast.error("Something went wrong. Try again later!");
        }
      });
  };

  const updatePublicLeaderboardConfig = (list: any) => {
    setSideConfig([{ title: "Leaderboard", path: PATH_DASHBOARD.general.competition }]);
    if (isPublicMultiLeaderboard) {
      setSideConfig([]);
      const np: any = [list[0]];
      publicMultiLeaderboardConfig[0].children = np;
      setSideConfig(publicMultiLeaderboardConfig);
    } else if (isPublicLeaderboard || isStakingLeaderboard) {
      setSideConfig([]);
      let np: any = publicLeaderboardConfig[0].children;
      np = [...np, list[0]];
      publicLeaderboardConfig[0].children = np;
      setSideConfig(publicLeaderboardConfig);
    }
  };

  const getPublicCompetition = () => {
    getCompetitionByIdForPublicUser(id, token)
      .then((res: any) => {
        if (res?.data?.body?.competition) {
          const { competition } = res.data.body;
          const mappedData = [
            {
              title: competition.name,
              _id: competition._id,
              path: `/pub/competition/${competition._id}`,
            },
          ];
          updatePublicCompetitionConfig(mappedData);
        }
      })
      .catch((e: any) => {
        if (e.response) {
          toast.error(e?.response?.data?.status?.message);
        } else {
          toast.error("Something went wrong. Try again later!");
        }
      });
  };

  const updatePublicCompetitionConfig = (list: any) => {
    setSideConfig([{ title: "Competition", path: PATH_DASHBOARD.general.competition }]);
    if (isPublicCompetition) {
      setSideConfig([]);
      let np: any = publicCompetitionConfig[0].children;
      np = [...np, list[0]];
      publicCompetitionConfig[0].children = np;
      setSideConfig(publicCompetitionConfig);
    }
  };

  const getSidebarItems = async () => {
    let leaderboardResponse = await getAllLeaderboards(0, 0, token);
    await mapList(leaderboardResponse?.data?.body?.leaderboards, "leaderboard");
    let competitionResponse = await getAllCompetitions(0, 0);
    await mapList(leaderboardResponse?.data?.body?.competitions, "competition");
  };

  const mapList = async (list: any, component: any) => {
    const mappedData: any = [];
    if (list.length) {
      list.forEach((item: any) => {
        const temp = {
          title: item.name,
          _id: item._id,
          path: component === "leaderboard" ? `/dashboard/leaderboard/${item._id}` : `/dashboard/competition/${item._id}`,
        };
        mappedData.push(temp);
      });
    }
    // setLeaderboardList(mappedData);
    await setSideConfig(mappedData);
  };

  const renderContent = (items: any) => {
    return items.map((item: any, index: any) => (
      <FSiderItem to={item.path} title={item.title} prefix={item.icon} key={index} target={item.target && item.target}>
        {item.children && (
          <FSiderSubMenuItem>
            {item.children.map((subItem: any, index: any) => (
              <FSiderItem
                to={subItem.path}
                title={subItem.title}
                prefix={<img src="/ferrum/bullet.png" height={"4px"} />}
                key={index}
                target={subItem.target && subItem.target}></FSiderItem>
            ))}
          </FSiderSubMenuItem>
        )}
      </FSiderItem>
    ));
  };

  return (
    <FSider>
      {renderContent(homeSidebarConfig)}
      {renderContent(sideMenuItems)}
      {localStorageHelper.load(ME_TAG)?.role === "organizationAdmin" && renderContent(sidebarConfig)}
      {(isPublicLeaderboard || isPublicMultiLeaderboard || isPublicCompetition) && renderContent(sideConfig)}
      {isStakingLeaderboard && renderContent(sideConfig)}
      {renderContent(communityLeaderboardSidebarConfig)}
      {renderContent(tokensSidebarConfig)}
      {renderContent(bridgeSidebarConfig)}
      {renderContent(crucibleConfig)}
      {/* <FSiderItem to="/dashboard/crucible" title={"Crucible"}></FSiderItem> */}
    </FSider>
  );
};

export default DashboardSidebar;
