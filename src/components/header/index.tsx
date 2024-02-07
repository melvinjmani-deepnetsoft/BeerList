import { AppBar, AppBarSection, AppBarSpacer, Avatar } from '@progress/kendo-react-layout';
import { SvgIcon } from '@progress/kendo-react-common';
import { handIcon } from '@progress/kendo-svg-icons';

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
        <h1 style={{ fontSize: "18px", margin: 0 }}> beerlist </h1>
      </AppBarSection>

      <AppBarSpacer style={{ width: 32 }} />

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
