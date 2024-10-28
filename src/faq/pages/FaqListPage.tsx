import FaqListComponent from '../components/FaqListComponent';
import { Container, Grid } from '@mui/material';
import Footer from '../../components/Footer';


function FaqListPage() {
  return (
    <>

      <Container maxWidth="lg">
        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="stretch"
          spacing={3}
        >
          <Grid item xs={12}>
            <FaqListComponent />
          </Grid>
        </Grid>
      </Container>

      <Footer />
    </>
  );
}
export default FaqListPage;