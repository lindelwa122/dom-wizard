import { domManager, router } from 'dom-wizard';
import landingPage from './routes/landingPage';
import './css/style.css';
import routes from './router';

router.register(routes);
domManager.create(landingPage);
