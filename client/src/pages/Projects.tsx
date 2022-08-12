import { useMutation, useQuery } from '@apollo/client';
import { GET_CLIENTS } from '../apollo/queries/client.query';
import Loading from '../components/Loading';
import Error500 from './Errors/Error500';

function Projects() {
    const { data, loading, error } = useQuery(GET_CLIENTS);

    if (loading) return <Loading isLoading={loading} />;

    if (error) return <Error500 />;

    return <div>Projects</div>;
}

export default Projects;
