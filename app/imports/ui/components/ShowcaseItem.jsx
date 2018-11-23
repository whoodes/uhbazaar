import { Button, Item, Icon } from 'semantic-ui-react';
import React from 'react';
import { Bert } from 'meteor/themeteorchef:bert';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { Items } from '../../api/item/item';

class ShowcaseItem extends React.Component {
  constructor(props) {
    super(props);
    this.onClick = this.onClick.bind(this);
    this.deleteCallback = this.deleteCallback.bind(this);
  }

  deleteCallback(error) {
    if (error) {
      Bert.alert({ type: 'danger', message: `Delete failed: ${error.message}` });
    } else {
      Bert.alert({ type: 'success', message: 'Delete succeeded' });
      this.formRef.reset();
    }
  }

  onClick() {
    Items.remove(this.props.item._id, this.deleteCallback);
  }

  render() {
    const cardFontStyle = {
      color: '#17252a',
      marginBottom: '8px',
      fontWeight: 'bold',
      fontSize: '16px',
    };
    const button = { backgroundColor: '#3aafa9', color: '#feffff' };
    const imageStyle = { marginLeft: '32px' };
    const itemStyle = { marginBottom: '48px', marginTop: '32px' };
    return (
        <Item.Group>
          <Item style={itemStyle}>
            <Item.Image rounded size='medium' style={imageStyle} src={this.props.item.image}/>
            <Item.Content verticalAlign='middle'>
              <Item.Header>{this.props.item.title}</Item.Header>
              <Item.Meta>
                <span className='price'>{`$${this.props.item.price}`}</span>
              </Item.Meta>
              <Item.Description style={cardFontStyle}>
                {this.props.item.description}
              </Item.Description>
              <Button animated='vertical' style={button} size='large'>
                <Button.Content visible>Barter!</Button.Content>
                <Button.Content hidden>
                  <Icon name='money bill alternate'/>
                </Button.Content>
              </Button>
            </Item.Content>
          </Item>
        </Item.Group>
    );
  }
}

/** Require a document to be passed to this component. */
ShowcaseItem.propTypes = {
  item: PropTypes.object.isRequired,
};

/** Wrap this component in withRouter since we use the <Link> React Router element. */
export default withRouter(ShowcaseItem);
