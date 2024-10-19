import { useGetFeatureFlags } from '../hooks/useFeatureFlag';
import { createContext } from 'react';

import merge from 'lodash/merge';

export const FeatureFlagContext = createContext(null);

const uccFeatureFlags = {};

export const FeatureFlagProvider = (props) => {
  const featureFlagQueries = [
    useGetFeatureFlags({ app: 'ucc' }),
    useGetFeatureFlags({ app: 'gd-payments' }),
  ];
  featureFlagQueries.forEach((featureFlagQuery) => {
    if (isFetchedWithError(featureFlagQuery)) {
      return (
        <CxIntlWithMarketProvider>
          <ErrorPage
            debugMessage="Failed to fetch Feature Flags."
            error={featureFlagQuery.error}
          />
        </CxIntlWithMarketProvider>
      );
    }
    if (!isFetchedWithSuccess(featureFlagQuery)) {
      return (
        <CommerceSkeleton colsDimension="7fr 3fr" rowGap={10}>
          <CommerceSkeletonText cols={1} rows={1} />
          <CommerceSkeletonText cols={1} rows={1} />
          <CommerceSkeletonBlock height={600} cols={1} rows={2} />
          <CommerceSkeletonBlock height={290} cols={1} rows={1} />
          <CommerceSkeletonBlock height={290} cols={1} rows={1} />
        </CommerceSkeleton>
      );
    }
    merge(uccFeatureFlags, featureFlagQuery.data);
  });

  return (
    <FeatureFlagContext.Provider value={{ uccFeatureFlags }}>
      {props.children}
    </FeatureFlagContext.Provider>
  );
};