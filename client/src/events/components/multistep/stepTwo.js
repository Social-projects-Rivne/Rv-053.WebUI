var React = require('react'),
  Geocoder = require('../../../shared/components/Map/MapBox');

const StepTwo = () => ({
  getInitialState: function() {
    return { value: null };
  },
  onSelect: function(value) {
    this.setState({ value: value });
  },
  render: function() {
    /* jshint ignore:start */
    return (
      <div>
        <div className='clearfix pad1'>
          {/* Geocoder:
              accessToken -- Mapbox developer access token (required)
              onSelect    -- function called after selecting result (required)
              showLoader  -- Boolean to attach `.loading` class to results list
          */}
          <Geocoder
            accessToken='sk.eyJ1IjoibWFyaW5hZnJhbmtvIiwiYSI6ImNrNmFsbzN4dDA5N2szbm12Y2E0OXNzbXgifQ.HKzWExgRpbNFrXMjME74GA'
            onSelect={this.onSelect}
            showLoader={true}
            />
        </div>
        {this.state.value && <pre className='keyline-all'>{JSON.stringify(this.state.value, null, 2)}</pre>}
      </div>
    );
    /* jshint ignore:end */
  }
});


export default StepTwo;
