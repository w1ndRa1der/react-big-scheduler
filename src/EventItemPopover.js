import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {Row, Col} from 'antd'
import moment from 'moment'

class EventItemPopover extends Component {
    constructor(props) {
        super(props);
    }

    static propTypes = {
        schedulerData: PropTypes.object.isRequired,
        eventItem: PropTypes.object.isRequired,
        title: PropTypes.string.isRequired,
        startTime: PropTypes.string.isRequired,
        endTime: PropTypes.string.isRequired,
        statusColor: PropTypes.string.isRequired,
        subtitleGetter: PropTypes.func,
        viewEventClick: PropTypes.func,
        viewEventText:PropTypes.string,
        viewEvent2Click: PropTypes.func,
        viewEvent2Text: PropTypes.string,
    }

    render(){
        const {schedulerData, eventItem, title, startTime, endTime, statusColor,subtitleGetter, viewEventClick, viewEventText, viewEvent2Click, viewEvent2Text} = this.props;
        let start = moment(startTime), end = moment(endTime);

        let subtitleRow = <div />;
        if(subtitleGetter !== undefined){
            let subtitle = subtitleGetter(schedulerData, eventItem);
            if(subtitle != undefined){
                subtitleRow = (
                    <Row type="flex" align="middle">
                        <Col span={2}>
                            <div />
                        </Col>
                        <Col span={22} className="overflow-text">
                            <span className="header2-text" title={subtitle}>{subtitle}</span>
                        </Col>
                    </Row>
                );
            }
        }

        let opsRow = <div />;
        if(viewEventText !== undefined && viewEventClick !== undefined && (eventItem.clickable1 == undefined || eventItem.clickable1)){
            let col = (
                <Col span={22}>
                    <span className="header2-text" style={{color: '#108EE9', cursor: 'pointer'}} onClick={() => {viewEventClick(schedulerData, eventItem);}}>{viewEventText}</span>
                </Col>
            );
            if(viewEvent2Text !== undefined && viewEvent2Click !== undefined && (eventItem.clickable2 == undefined || eventItem.clickable2)) {
                col = (
                    <Col span={22}>
                        <span className="header2-text" style={{color: '#108EE9', cursor: 'pointer'}} onClick={() => {viewEventClick(schedulerData, eventItem);}}>{viewEventText}</span><span className="header2-text" style={{color: '#108EE9', cursor: 'pointer', marginLeft: '16px'}} onClick={() => {viewEvent2Click(schedulerData, eventItem);}}>{viewEvent2Text}</span>
                    </Col>
                )
            };
            opsRow = (
                <Row type="flex" align="middle">
                    <Col span={2}>
                        <div />
                    </Col>
                    {col}
                </Row>
            );
        }
        else if(viewEvent2Text !== undefined && viewEvent2Click !== undefined && (eventItem.clickable2 == undefined || eventItem.clickable2)) {
            let col = (
                <Col span={22}>
                    <span className="header2-text" style={{color: '#108EE9', cursor: 'pointer'}} onClick={() => {viewEvent2Click(schedulerData, eventItem);}}>{viewEvent2Text}</span>
                </Col>
            );
            opsRow = (
                <Row type="flex" align="middle">
                    <Col span={2}>
                        <div />
                    </Col>
                    {col}
                </Row>
            );
        }

        return (
            <div style={{width: '300px'}}>
                <Row type="flex" align="middle">
                    <Col span={2}>
                        <div className="status-dot" style={{backgroundColor: statusColor}} />
                    </Col>
                    <Col span={22} className="overflow-text">
                        <span className="header2-text" style={{color: statusColor}}>{eventItem.status}</span>
                    </Col>
                </Row>
                {subtitleRow}
                <Row type="flex" align="middle">
                    <Col span={2}>
                        <div />
                    </Col>
                    <Col span={22}>
                        <span className="header1-text">{start.format('HH:mm')}</span><span className="help-text" style={{marginLeft: '8px'}}>{start.format('Do MMM')}</span><span className="header2-text"  style={{marginLeft: '8px'}}>-</span><span className="header1-text" style={{marginLeft: '8px'}}>{end.format('HH:mm')}</span><span className="help-text" style={{marginLeft: '8px'}}>{end.format('Do MMM')}</span>
                    </Col>
                </Row>
                {eventItem.renderDetails && (eventItem.renderDetails.map((item,key) => (
                    <Row type="flex" align="middle" key={key}>
                        <Col span={2}>
                            <div />
                        </Col>
                        <Col span={22} className="overflow-text">
                            <span className="header2-text">{eventItem.renderKey[item]}&nbsp;:&nbsp;{eventItem[item]}</span>
                        </Col>
                    </Row>
                )))}
                {opsRow}
            </div>
        );
    }
}

export default EventItemPopover
