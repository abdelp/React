import React from 'react';
import cx from 'classnames';
import { VISIBILITY_FILTERS } from '../constants';
import { connect } from 'react-redux';
import { setFilter } from '../redux/actions';

const VisibilityFilters = ({ activeFilter, setFilter }) => (
  <div className='visibility-filters'>
    {Object.keys(VISIBILITY_FILTERS).map(filterKey => {
      const currentFilter = VISIBILITY_FILTERS[filterKey];
      return (
        <button
          key={`visibility-filter-${currentFilter}`}
          className={cx(
            'filter',
            currentFilter === activeFilter && 'filter--active'
          )}
          onClick={() =>
            setFilter(currentFilter)
          }
        >
          {currentFilter}
        </button>
      );
    })}
  </div>
);

const mapStateToProps = state =>
  ({ activeFilter: state.visibilityFilter });

export default connect(
  mapStateToProps,
  { setFilter }
)(VisibilityFilters);