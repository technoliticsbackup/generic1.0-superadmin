import { useParams } from 'react-router-dom';
import LoadingScreen from '../../../../../components/loading-screen';
import { useGetOneOrgmanegerById } from '../../../../../services/orgmanegerServices';
import OrgmanegementDetail from './OrgmanegementDetail';
import StaffList from './StaffList';

export default function Detail() {
  const { id } = useParams();

  const { data, isLoading } = useGetOneOrgmanegerById(id);

  if (isLoading) return <LoadingScreen />;

  return (
    <>
      <OrgmanegementDetail instdata={data} />
      <div style={{marginTop: 50}}>
      <StaffList orgId={data?._id} />
      </div>
      
    </>
  );
}
