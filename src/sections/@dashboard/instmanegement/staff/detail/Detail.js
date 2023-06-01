import { useParams } from 'react-router-dom';
import LoadingScreen from '../../../../../components/loading-screen';
import { useGetOneInstmanegerById } from '../../../../../services/instmanegerServices';
import InstmanegementDetail from './InstmanegementDetail';
import StaffList from './StaffList';

export default function Detail() {
  const { id } = useParams();

  const { data, isLoading } = useGetOneInstmanegerById(id);

  if (isLoading) return <LoadingScreen />;

  return (
    <>
      <InstmanegementDetail instdata={data} />
      <div style={{marginTop: 50}}>
      <StaffList />
      </div>
      
    </>
  );
}
