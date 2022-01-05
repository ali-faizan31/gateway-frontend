const getPublicLeaderboard = () => { 
    getLeaderboardByIdForPublicUser(id)
      .then((res) => {
        if (res?.data?.body?.leaderboard) {
          const { leaderboard } = res.data.body;
          let mappedData = [];
          if (isPublicMultiLeaderboard) {
            mappedData = [
              { title: leaderboard.name, _id: leaderboard._id, path: `/pub/multi/leaderboard/${leaderboard._id}` }
            ];
          } else {
            mappedData = [
              { title: leaderboard.name, _id: leaderboard._id, path: `/pub/leaderboard/${leaderboard._id}` }
            ];
          }
          updatePublicLeaderboardConfig(mappedData);
        }
      })
      .catch((e) => {
        if (e.response) {
          enqueueSnackbar(e.response.data.status.message, {
            variant: 'error'
          });
        } else {
          enqueueSnackbar('Something went wrong. Try again later!', {
            variant: 'error'
          });
        }
      });
  };

  const getPublicCompetition = () => {
    getCompetitionByIdForPublicUser(id)
      .then((res) => {
        if (res?.data?.body?.competition) {
          const { competition } = res.data.body;
          const { leaderboard } = res.data.body;
          const mappedData = [
            { title: competition.name, _id: competition._id, path: `/pub/competition/${competition._id}` }
          ];
          updatePublicCompetitionConfig(mappedData);
        }
      })
      .catch((e) => {
        if (e.response) {
          enqueueSnackbar(e.response.data.status.message, {
            variant: 'error'
          });
        } else {
          enqueueSnackbar('Something went wrong. Try again later!', {
            variant: 'error'
          });
        }
      });
  };
