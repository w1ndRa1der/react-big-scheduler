import React, {Component} from 'react'
import PropTypes from 'prop-types'
import AgendaResourceEvents from './AgendaResourceEvents'

class AgendaView extends Component {
    constructor(props) {
        super(props);
    }

    static propTypes = {
        schedulerData: PropTypes.object.isRequired,
        subtitleGetter: PropTypes.func,
        eventItemClick: PropTypes.func,
        viewEventClick: PropTypes.func,
        viewEventText:PropTypes.string,
        viewEvent2Click: PropTypes.func,
        viewEvent2Text: PropTypes.string,
        resourceClickedFunc: PropTypes.func,
    }

    render() {

        const {schedulerData} = this.props;
        const {renderData} = schedulerData;
        let agendaResourceTableWidth = schedulerData.getResourceTableWidth(), tableHeaderHeight = schedulerData.getTableHeaderHeight();
        let resourceEventsList = renderData.map((item) => {
            return <AgendaResourceEvents
                {...this.props}
                resourceEvents={item}
                key={item.slotId} />
        });
        let resourceName = schedulerData.isEventPerspective ? '任务名称' : '资源名称';

        return (
            <tr>
                <td>
                    <table className="scheduler-table">
                        <thead>
                            <tr style={{height: tableHeaderHeight}}>
                                <th style={{width: agendaResourceTableWidth}} className="header3-text">{resourceName}</th>
                                <th className="header3-text">工作事项</th>
                            </tr>
                        </thead>
                        <tbody>
                            {resourceEventsList}
                        </tbody>
                    </table>
                </td>
            </tr>
        );
    }
}

export default AgendaView