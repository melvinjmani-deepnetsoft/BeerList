import { AppBar, AppBarSection, AppBarSpacer, Avatar } from '@progress/kendo-react-layout';
import { SvgIcon } from '@progress/kendo-react-common';
import { handIcon } from '@progress/kendo-svg-icons';
import { Link } from "react-router-dom";

const kendokaAvatar = 'https://www.telerik.com/kendo-react-ui-develop/components/images/kendoka-react.png';

const Header = () => {
  return (
    <AppBar>
      <AppBarSection>
        <button className="k-button k-button-md k-rounded-md k-button-flat k-button-flat-base">
          <SvgIcon icon={handIcon} />
        </button>
      </AppBarSection>

      <AppBarSpacer style={{ width: 4 }} />

      <AppBarSection>
        <h1 className="title"> GIT S.A. </h1>
      </AppBarSection>

      <AppBarSpacer style={{ width: 32 }} />

      <AppBarSection className='appbar'>
          <ul>
            <li>
              <span> <Link className="simple-link" to="/beer-list"> Beer List </Link> </span>
            </li>
            <li>
              <span> <Link className='simple-link' to="/bill-list"> Billing List </Link> </span>
            </li>
          </ul>
        </AppBarSection>

      <AppBarSpacer />

      <AppBarSection>
        <Avatar type="image">
          <img src={kendokaAvatar} alt="KendoReact Layout Kendoka Avatar" />
        </Avatar>
      </AppBarSection>
    </AppBar>
  );
};

export default Header;
