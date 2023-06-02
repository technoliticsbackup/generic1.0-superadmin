import PropTypes from 'prop-types';
import InstmanegementDetail from './InstmanegementDetail';
import StaffList from './StaffList';


Detail.propTypes = {
  data: PropTypes.string,
};

export default function Detail({ data }) {

  return (
    <>
      <InstmanegementDetail instdata={data} />
      <div style={{ marginTop: 50 }}>
        <StaffList instId={data?._id} />
      </div>
    </>
  );
}
