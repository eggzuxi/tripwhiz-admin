import ProductAddComponent from '../components/ProductAddComponent';
import PageTitleWrapper from '../../components/PageTitleWrapper';
import PageHeader from '../../qna/components/PageHeader';
import { Container, Grid } from '@mui/material';
import Footer from '../../components/Footer';

function ProductAddPage() {

  return (
    <>
      <PageTitleWrapper>
        <PageHeader />
      </PageTitleWrapper>

      <Container maxWidth="lg">
        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="stretch"
          spacing={3}
        >
          <Grid item xs={12}>
            <ProductAddComponent/>
          </Grid>
        </Grid>
      </Container>

      <Footer />
    </>
  );
}

export default ProductAddPage;